import { NextResponse } from "next/server";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { error: "Contact service is not configured." },
      { status: 500 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const honeypot =
    typeof payload.website === "string" ? payload.website.trim() : "";

  // Bots fill the hidden honeypot field — accept silently without sending.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in all fields." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (name.length > 120 || email.length > 200 || message.length > 4000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const text = [
    "📬 New message from your portfolio",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      },
    );
    const result = await response.json();

    if (!response.ok || !result.ok) {
      return NextResponse.json(
        { error: "Failed to deliver message." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to deliver message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
