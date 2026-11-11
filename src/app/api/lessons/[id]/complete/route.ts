import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { completeVocabLesson } from "@/lib/progress";

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
    const result = await completeVocabLesson(session.user.id, id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Complete failed" },
      { status: 400 },
    );
  }
}
