import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Примитивный rate limit в памяти: 3 заявки с IP за 10 минут.
// Для одного инстанса хватает; на serverless сбрасывается при холодном старте.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 3;

function rateLimited(ip: string) {
  const now = Date.now();
  const prev = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (prev.length >= LIMIT) return true;
  hits.set(ip, [...prev, now]);
  return false;
}

const esc = (s: string) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { error: "Слишком много заявок. Попробуйте позже." },
        { status: 429 }
      );
    }

    const { name, email, details, website } = await req.json();

    // honeypot — боты заполняют скрытое поле, отвечаем «успехом» и молчим
    if (website) return NextResponse.json({ ok: true });

    if (!name?.trim() || !email?.trim() || !details?.trim()) {
      return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Некорректный email" }, { status: 400 });
    }
    if (details.length > 4000) {
      return NextResponse.json({ error: "Слишком длинное сообщение" }, { status: 400 });
    }

    const text =
      `🟣 <b>Новая заявка с сайта</b>\n\n` +
      `<b>Имя:</b> ${esc(name)}\n` +
      `<b>Email:</b> <code>${esc(email)}</code>\n\n` +
      `<b>Детали:</b>\n${esc(details)}\n\n` +
      `<i>${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Prague" })}</i>`;

   const res = await fetch(
  `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TELEGRAM_CHAT_ID,
      ...(process.env.TELEGRAM_THREAD_ID && {
        message_thread_id: Number(process.env.TELEGRAM_THREAD_ID),
      }),
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  }
);

    if (!res.ok) {
      console.error("Telegram error:", await res.text());
      return NextResponse.json({ error: "Не удалось отправить" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}