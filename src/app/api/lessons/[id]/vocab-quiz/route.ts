import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { submitVocabQuiz } from "@/lib/progress";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = (await request.json()) as {
      answers?: { vocabId: string; kind: "mcq" | "fill"; answer: string }[];
    };
    const result = await submitVocabQuiz(session.user.id, id, body.answers ?? []);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Quiz failed" },
      { status: 400 },
    );
  }
}
