import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW = 10 * 60 * 1000;
const LIMIT = 3;

const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);

  if (timestamps.length >= LIMIT) {
    return true;
  }

  if (timestamps.length === 0) {
    hits.delete(ip);
  } else {
    hits.set(ip, [...timestamps, now]);
  }

  return false;
}

const escapeHtml = (str: string): string =>
  str.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char] || char;
  });

export async function POST(req: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, details, website } = body;

    if (website) {
      return NextResponse.json({ ok: true });
    }

    if (!name?.trim() || !email?.trim() || !details?.trim()) {
      return NextResponse.json(
        { error: "Please fill out all required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (details.length > 4000) {
      return NextResponse.json(
        { error: "Message is too long (4000 char max)" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Europe/Prague",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const text =
      `🟣 <b>New Project Inquiry</b>\n\n` +
      `<b>Name:</b> ${escapeHtml(name.trim())}\n` +
      `<b>Email:</b> <code>${escapeHtml(email.trim())}</code>\n\n` +
      `<b>Details:</b>\n${escapeHtml(details.trim())}\n\n` +
      `<i>${timestamp} (Europe/Prague)</i>`;

    const telegramPayload: Record<string, unknown> = {
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    };

    if (process.env.TELEGRAM_THREAD_ID) {
      telegramPayload.message_thread_id = Number(process.env.TELEGRAM_THREAD_ID);
    }

    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(telegramPayload),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Telegram API Error:", errorText);
      return NextResponse.json(
        { error: "Failed to dispatch notification" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API Route Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
