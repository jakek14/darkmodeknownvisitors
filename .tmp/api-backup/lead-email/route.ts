import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Expect these env vars to be configured
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_INBOX_TO, LEAD_INBOX_FROM (optional)

function getRequiredEnv(name: string): string {
	const val = process.env[name];
	if (!val) throw new Error(`Missing environment variable: ${name}`);
	return val;
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
					<th colspan="2" style="text-align:left;padding:16px 20px;background:#111827;color:#e5e7eb;font-size:18px;">New Demo Request — KnownVisitors</th>
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
			first_name,
			last_name,
			email,
			phone,
			website,
			avg_monthly_traffic,
			hear_about,
		} = body as Record<string, string>;

		// Basic validation
		if (!first_name || !last_name || !email || !website) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const smtpHost = getRequiredEnv("SMTP_HOST");
		const smtpPort = Number(getRequiredEnv("SMTP_PORT"));
		const smtpUser = getRequiredEnv("SMTP_USER");
		const smtpPass = getRequiredEnv("SMTP_PASS");
		const toAddress = getRequiredEnv("LEAD_INBOX_TO");
		const fromAddress = process.env.LEAD_INBOX_FROM || `KnownVisitors Leads <${smtpUser}>`;

		const transporter = nodemailer.createTransport({
			host: smtpHost,
			port: smtpPort,
			secure: smtpPort === 465,
			auth: { user: smtpUser, pass: smtpPass },
		});

		const subject = `New Demo Request: ${first_name} ${last_name} — ${website}`;
		const payload = {
			first_name,
			last_name,
			email,
			phone,
			website,
			avg_monthly_traffic,
			hear_about,
			page: req.headers.get("referer") || "",
			user_agent: req.headers.get("user-agent") || "",
		};

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
		console.error("Lead email error", err);
		return NextResponse.json({ error: "Failed to send" }, { status: 500 });
	}
}
