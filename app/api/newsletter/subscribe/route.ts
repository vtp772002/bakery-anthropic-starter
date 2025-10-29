import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LIST_FILE = path.join(DATA_DIR, "newsletter.json");

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if (!fs.existsSync(LIST_FILE)) fs.writeFileSync(LIST_FILE, JSON.stringify({ emails: [] }, null, 2));
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    ensureDataFile();
    const raw = fs.readFileSync(LIST_FILE, "utf8");
    const data = JSON.parse(raw || "{}");
    const list: string[] = Array.isArray(data.emails) ? data.emails : [];
    if (!list.includes(email)) {
      list.push(email);
      fs.writeFileSync(LIST_FILE, JSON.stringify({ emails: list }, null, 2));
    }

    // Notify owner via Resend if configured
    const apiKey = process.env.RESEND_API_KEY;
    const notifyTo = process.env.NEWSLETTER_NOTIFY_TO || "phamvantoan7july@gmail.com";
    const from = process.env.RESEND_FROM || "JT Bakery <onboarding@resend.dev>"; // safe default
    if (apiKey && notifyTo) {
      const resend = new Resend(apiKey);
      try {
        await resend.emails.send({
          from,
          to: notifyTo,
          subject: "New newsletter subscriber",
          text: `Email: ${email}`,
        });
      } catch (e: any) {
        console.error("Resend send error", e?.message || e);
      }
    } else {
      console.warn("RESEND not configured: set RESEND_API_KEY, RESEND_FROM (optional) and NEWSLETTER_NOTIFY_TO");
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("Newsletter subscribe API error", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


