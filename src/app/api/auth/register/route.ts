import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { isUniqueViolation } from "@/lib/errors";
import { jsonError, readJson, toErrorResponse } from "@/lib/http";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

// The register page matches this exact string to show a friendly message.
const EMAIL_TAKEN = "Email already registered";

export async function POST(request: Request) {
  try {
    const data = await readJson(request, schema);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (existing) return jsonError(EMAIL_TAKEN, 400);

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { email: data.email, passwordHash, name: data.name },
      select: { id: true, email: true },
    });

    return NextResponse.json(user);
  } catch (error) {
    // Two sign-ups with the same email can both pass the check above; the
    // unique index catches the second one.
    if (isUniqueViolation(error)) return jsonError(EMAIL_TAKEN, 400);
    return toErrorResponse(error, "Registration failed");
  }
}
