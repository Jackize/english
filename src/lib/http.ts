import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "./auth";
import { AppError } from "./errors";
import { prisma } from "./prisma";

/**
 * Small toolkit shared by every route handler: authentication guards, body
 * parsing with zod and one place that maps errors to HTTP responses.
 */

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

type Guarded<T> = { ok: true; value: T } | { ok: false; response: NextResponse };

export async function requireUser(): Promise<Guarded<{ id: string }>> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) return { ok: false, response: jsonError("Unauthorized", 401) };
  return { ok: true, value: { id } };
}

/**
 * The role inside the JWT is frozen at sign-in, so a demoted admin would keep
 * write access until the token expires. Admin routes re-check the role in the
 * database; it costs one primary-key lookup on a low-traffic path.
 */
export async function requireAdmin(): Promise<Guarded<{ id: string }>> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id || session.user.role !== "ADMIN") {
    return { ok: false, response: jsonError("Forbidden", 403) };
  }

  const user = await prisma.user.findUnique({ where: { id }, select: { role: true } });
  if (user?.role !== "ADMIN") return { ok: false, response: jsonError("Forbidden", 403) };

  return { ok: true, value: { id } };
}

export class InvalidBodyError extends AppError {
  constructor(
    message: string,
    readonly issues?: z.core.$ZodIssue[],
  ) {
    super(message, 400);
    this.name = "InvalidBodyError";
  }
}

/** Parses the JSON body against `schema`, throwing InvalidBodyError (400) on failure. */
export async function readJson<T extends z.ZodType>(
  request: Request,
  schema: T,
  message = "Invalid input",
): Promise<z.infer<T>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw new InvalidBodyError(message);
  }

  const result = schema.safeParse(body);
  if (!result.success) throw new InvalidBodyError(message, result.error.issues);
  return result.data;
}

/**
 * Converts a thrown error into a response. Domain errors (AppError) keep their
 * message and status. Unknown errors are logged and replaced by `fallback`, so
 * Prisma/driver messages never reach the browser.
 */
export function toErrorResponse(error: unknown, fallback: string, status = 500) {
  if (error instanceof AppError) return jsonError(error.message, error.status);
  console.error(`[api] ${fallback}`, error);
  return jsonError(fallback, status);
}
