import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { completeTheory } from "@/lib/progress";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const progress = await completeTheory(session.user.id, id);
    return NextResponse.json({ ok: true, progress });
  } catch {
    return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
  }
}
