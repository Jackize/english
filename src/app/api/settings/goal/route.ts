import { NextResponse } from "next/server";
import { readJson, requireUser, toErrorResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { dailyGoalSchema } from "@/lib/settings";

export async function POST(request: Request) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  try {
    const data = await readJson(request, dailyGoalSchema);

    await prisma.user.update({
      where: { id: guard.value.id },
      data: {
        dailyGoalLessons: data.dailyGoalLessons,
        dailyGoalMinutes: data.dailyGoalMinutes,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error, "Cannot save goal");
  }
}
