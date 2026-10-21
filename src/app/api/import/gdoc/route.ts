import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { confirmImport, previewImport } from "@/lib/import-service";

const schema = z.object({
  url: z.string().url(),
  action: z.enum(["preview", "confirm"]),
  documentTitle: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { url, action, documentTitle } = schema.parse(body);

    if (action === "preview") {
      const preview = await previewImport(url);
      return NextResponse.json(preview);
    }

    const result = await confirmImport(url, documentTitle);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Import failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
