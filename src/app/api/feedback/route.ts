import { NextRequest, NextResponse } from "next/server";
import { createFeedback, type FeedbackKind } from "@/lib/db/feedback";

export const runtime = "nodejs";

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

/** Public endpoint for the contact and feedback forms. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const kind: FeedbackKind = body.kind === "contact" ? "contact" : "feedback";
    const name = clean(body.name, 120);
    const email = clean(body.email, 200);
    const message = clean(body.message, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const ratingValue = Number(body.rating);
    await createFeedback({
      kind,
      name,
      email,
      message,
      topic: clean(body.topic, 120) || null,
      subject: clean(body.subject, 200) || null,
      rating: ratingValue >= 1 && ratingValue <= 5 ? ratingValue : null,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Feedback submission failed:", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again." },
      { status: 500 }
    );
  }
}
