import { NextResponse } from "next/server";
import { z } from "zod";
import { LEVEL_CODES } from "@/lib/curriculum";
import { readJson, requireUser, toErrorResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";
import { dailyGoalSchema } from "@/lib/settings";

const levelSchema = z.enum(LEVEL_CODES);

const schema = dailyGoalSchema.extend({
  targetLevel: levelSchema.nullable().optional(),
  placementLevel: levelSchema.nullable().optional(),
});

export async function POST(request: Request) {
  const guard = await requireUser();
  if (!guard.ok) return guard.response;

  try {
    const data = await readJson(request, schema);

    await prisma.user.update({
      where: { id: guard.value.id },
      data: {
        dailyGoalLessons: data.dailyGoalLessons,
        dailyGoalMinutes: data.dailyGoalMinutes,
        targetLevel: data.targetLevel ?? null,
        placementLevel: data.placementLevel ?? null,
        onboardedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return toErrorResponse(error, "Cannot save onboarding");
  }
}
