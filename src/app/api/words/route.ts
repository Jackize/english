import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 20));
  const skip = (page - 1) * limit;

  const where = {
    archived: false,
    ...(search
      ? {
          OR: [
            { word: { contains: search } },
            { meaningEn: { contains: search } },
            { meaningVi: { contains: search } },
          ],
        }
      : {}),
  };

  const [words, total] = await Promise.all([
    prisma.word.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.word.count({ where }),
  ]);

  return NextResponse.json({
    words: words.map((w) => ({
      id: w.id,
      word: w.word,
      ipa: w.ipa,
      wordForm: w.wordForm,
      meaningEn: w.meaningEn,
      meaningVi: w.meaningVi,
      categoryName: w.category.name,
      createdAt: w.createdAt.toISOString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

const updateSchema = z.object({
  id: z.string(),
  word: z.string().min(1),
  ipa: z.string().optional(),
  wordForm: z.string().optional(),
  meaningEn: z.string().min(1),
  meaningVi: z.string().min(1),
});

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = updateSchema.parse(await request.json());
    const word = await prisma.word.update({
      where: { id: data.id },
      data: {
        word: data.word,
        ipa: data.ipa,
        wordForm: data.wordForm,
        meaningEn: data.meaningEn,
        meaningVi: data.meaningVi,
      },
    });
    return NextResponse.json(word);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await prisma.word.update({ where: { id }, data: { archived: true } });
  return NextResponse.json({ ok: true });
}
