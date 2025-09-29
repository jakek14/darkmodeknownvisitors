import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getRequiredEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing environment variable: ${name}`);
  return val;
}

function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

function getOptOutInbox(): string {
  const to = process.env.PRIVACY_INBOX_TO || process.env.LEAD_INBOX_TO;
  if (!to) throw new Error("Missing PRIVACY_INBOX_TO or LEAD_INBOX_TO");
  return to;
}

function buildHtmlEmail(payload: Record<string, string>) {
  const rows = Object.entries(payload)
    .map(([key, value]) => {
      const label = key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (m) => m.toUpperCase());
      return `<tr><td style="padding:8px 12px;background:#0b0b0b;border-bottom:1px solid #1f1f1f;color:#cfcfcf;white-space:nowrap;">${label}</td><td style="padding:8px 12px;background:#0f0f0f;border-bottom:1px solid #1f1f1f;color:#ffffff;">${value || "-"}</td></tr>`;
    })
    .join("");
  return `<!doctype html><html><body style="margin:0;background:#0a0a0a;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;">
    <table cellpadding="0" cellspacing="0" width="100%" style="max-width:720px;margin:24px auto;border:1px solid #1f1f1f;border-radius:12px;overflow:hidden;background:#0f0f10;">
      <thead>
        <tr>
          <th colspan="2" style="text-align:left;padding:16px 20px;background:#111827;color:#e5e7eb;font-size:18px;">New Privacy Request — KnownVisitors</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      email = "",
      request_type = "",
      zipcode = "",
      agent = "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ["g-recaptcha-response"]: recaptchaResponse = "",
      gpc = "",
    } = body as Record<string, string>;

    if (!email || !request_type) {
      return NextResponse.json({ error: "Missing email or request_type" }, { status: 400 });
    }

    const payload = {
      request_type,
      email,
      zipcode,
      agent,
      gpc,
      referer: req.headers.get("referer") || "",
      user_agent: req.headers.get("user-agent") || "",
      ip: req.headers.get("x-forwarded-for") || "",
    };

    // Verify reCAPTCHA if keys are configured
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || "";
    if (recaptchaSecret) {
      if (!recaptchaResponse) {
        return NextResponse.json({ error: "recaptcha_required" }, { status: 400 });
      }
      try {
        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret: recaptchaSecret, response: recaptchaResponse }),
        });
        const verify = (await verifyRes.json()) as { success?: boolean };
        if (!verify.success) {
          return NextResponse.json({ error: "recaptcha_failed" }, { status: 400 });
        }
      } catch {}
    }

    // If SMTP is not configured (e.g., local), accept and log instead of failing
    if (!isSmtpConfigured()) {
      console.warn("Opt-out: SMTP not configured; logging request only");
      console.log("opt-out-request", payload);
      return NextResponse.json({ ok: true, emailed: false });
    }

    const smtpHost = getRequiredEnv("SMTP_HOST");
    const smtpPort = Number(getRequiredEnv("SMTP_PORT"));
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const toAddress = getOptOutInbox();
    const fromAddress = process.env.LEAD_INBOX_FROM || `KnownVisitors Privacy <${smtpUser}>`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const subject = `Privacy Request: ${request_type} — ${email}`;

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject,
      html: buildHtmlEmail(payload),
      text: Object.entries(payload)
        .map(([k, v]) => `${k}: ${v ?? "-"}`)
        .join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Opt-out error", err);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}


