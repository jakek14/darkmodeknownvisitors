import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

function buildTextEmail(payload: Record<string, string>) {
	const lines: string[] = [];
	const fullName = [payload.first_name, payload.last_name].filter(Boolean).join(" ");
	lines.push(`New demo request from ${fullName}`);
	lines.push("");
	lines.push(`Email: ${payload.email || "-"}`);
	lines.push(`Phone: ${payload.phone || "-"}`);
	lines.push(`Website: ${payload.website || "-"}`);
	lines.push(`Avg monthly traffic: ${payload.avg_monthly_traffic || "-"}`);
	lines.push(`Heard about us: ${payload.hear_about || "-"}`);
	return lines.join("\n");
}

function buildMinimalHtmlEmail(payload: Record<string, string>) {
	const fullName = [payload.first_name, payload.last_name].filter(Boolean).join(" ");
	return `<!doctype html><html><body style="margin:0;padding:16px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;color:#000;line-height:1.5;">
		<p style="margin:0 0 12px 0;color:#000;">New demo request from <strong style="color:#000;">${fullName || "-"}</strong></p>
		<p style="margin:0 0 6px 0;color:#000;"><span style="font-weight:600;">Email:</span> <span style="font-weight:400;color:#000;">${payload.email || "-"}</span></p>
		<p style="margin:0 0 6px 0;color:#000;"><span style="font-weight:600;">Phone:</span> <span style="font-weight:400;color:#000;">${payload.phone || "-"}</span></p>
		<p style="margin:0 0 6px 0;color:#000;"><span style="font-weight:600;">Website:</span> <a href="${payload.website || '#'}" target="_blank" rel="noopener noreferrer" style="color:#000;text-decoration:underline;">${payload.website || "-"}</a></p>
		<p style="margin:0 0 6px 0;color:#000;"><span style="font-weight:600;">Avg monthly traffic:</span> <span style="font-weight:400;color:#000;">${payload.avg_monthly_traffic || "-"}</span></p>
		<p style="margin:0 0 0 0;color:#000;"><span style="font-weight:600;">Heard about us:</span> <span style="font-weight:400;color:#000;">${payload.hear_about || "-"}</span></p>
	</body></html>`;
}

// Prevent auto-linking in some email clients by obfuscating the URL
function obfuscateUrlForEmail(url: string): string {
	if (!url) return "";
	// Insert zero-width space after scheme to break auto-link, and replace dots with [.] for reliability
	return url
		.replace(/^(https?):\/\//i, (_, p1: string) => `${p1}://\u200B`)
		.replace(/\./g, "[.]");
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

		const apiKey = getRequiredEnv("RESEND_API_KEY");
		const toAddress = getRequiredEnv("LEAD_INBOX_TO");
		const fromAddress = process.env.LEAD_INBOX_FROM || "KnownVisitors <demo@knownvisitors.com>";

		const subject = `New demo request from ${first_name} ${last_name}`;
		const payload = {
			first_name,
			last_name,
			email,
			phone,
			website,
			avg_monthly_traffic,
			hear_about,
		};

		const resend = new Resend(apiKey);
		const sendResult = await resend.emails.send({
			from: fromAddress,
			to: toAddress,
			subject,
			html: buildMinimalHtmlEmail(payload),
			text: buildTextEmail(payload),
			reply_to: email,
		});
		if (sendResult.error) throw new Error(sendResult.error.message || "Resend send error");
		console.log("Lead email sent", { id: sendResult.data?.id, to: toAddress, from: fromAddress });

		return NextResponse.json({ ok: true, id: sendResult.data?.id });
	} catch (err) {
		console.error("Lead email error", err);
		return NextResponse.json({ error: "Failed to send" }, { status: 500 });
	}
}
