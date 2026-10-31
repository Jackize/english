import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  dailyGoalLessons: z.number().int().min(1).max(10),
  dailyGoalMinutes: z.number().int().min(5).max(180),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        dailyGoalLessons: data.dailyGoalLessons,
        dailyGoalMinutes: data.dailyGoalMinutes,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    return NextResponse.json({ error: "Cannot save goal" }, { status: 500 });
  }
}
