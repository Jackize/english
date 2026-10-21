import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const documentSets = await prisma.documentSet.findMany({
    include: {
      categories: {
        include: {
          _count: { select: { words: { where: { archived: false } } } },
        },
        orderBy: { order: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = documentSets.flatMap((ds) =>
    ds.categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      wordCount: c._count.words,
      documentSetName: ds.name,
    })),
  );

  return NextResponse.json({
    categories,
    documentSetName: documentSets[0]?.name,
  });
}
