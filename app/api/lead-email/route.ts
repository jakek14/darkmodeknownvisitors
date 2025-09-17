import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getRequiredEnv(name: string): string {
	const val = process.env[name];
	if (!val) throw new Error(`Missing environment variable: ${name}`);
	return val;
}

// removed old HTML table builder

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

// removed obfuscation helper (not used)

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
        const toAddressRaw = getRequiredEnv("LEAD_INBOX_TO");
        const toAddress = toAddressRaw.split(",").map((s) => s.trim()).filter(Boolean);
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
		const plain = buildTextEmail(payload);

		function escapeHtml(input: string): string {
			return input
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#39;");
		}

		const fullNameHtml = escapeHtml([payload.first_name, payload.last_name].filter(Boolean).join(" ") || "-");
		const emailHtml = escapeHtml(payload.email || "-");
		const phoneHtml = escapeHtml(payload.phone || "-");
		const trafficHtml = escapeHtml(payload.avg_monthly_traffic || "-");
		const heardHtml = escapeHtml(payload.hear_about || "-");
		const websiteDisplay = escapeHtml(payload.website || "-");
		const websiteHref = payload.website ? payload.website : "#";

		const minimalHtml = `<!doctype html>
		<html>
		<head>
			<meta name="color-scheme" content="light">
			<meta name="supported-color-schemes" content="light">
		</head>
		<body style="margin:0;padding:0;background:#ffffff;">
			<div style="padding:16px;background:#ffffff;color:#000000;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.5;">
				<p style="margin:0 0 12px 0;color:#000000;">New demo request from <strong style="color:#000000;"><font color="#000000">${fullNameHtml}</font></strong></p>
				<p style="margin:0 0 6px 0;color:#000000;"><span style="font-weight:600;color:#000000;">Email:</span> 
					${payload.email ? `<a href="mailto:${emailHtml}" style="color:#000000;text-decoration:underline;"><span style="color:#000000;"><font color="#000000">${emailHtml}</font></span></a>` : `<span style="font-weight:400;color:#000000;"><font color="#000000">-</font></span>`}
				</p>
				<p style="margin:0 0 6px 0;color:#000000;"><span style="font-weight:600;color:#000000;">Phone:</span> 
					${payload.phone ? `<a href="tel:${phoneHtml}" style="color:#000000;text-decoration:underline;"><span style="color:#000000;"><font color="#000000">${phoneHtml}</font></span></a>` : `<span style="font-weight:400;color:#000000;"><font color="#000000">-</font></span>`}
				</p>
				<p style="margin:0 0 6px 0;color:#000000;"><span style="font-weight:600;color:#000000;">Website:</span> 
					${payload.website ? `<a href="${websiteHref}" target="_blank" rel="noopener noreferrer" style="color:#000000;text-decoration:underline;"><span style="color:#000000;"><font color="#000000">${websiteDisplay}</font></span></a>` : `<span style="font-weight:400;color:#000000;"><font color="#000000">-</font></span>`}
				</p>
				<p style="margin:0 0 6px 0;color:#000000;"><span style="font-weight:600;color:#000000;">Avg monthly traffic:</span> <span style="font-weight:400;color:#000000;"><font color="#000000">${trafficHtml}</font></span></p>
				<p style="margin:0;color:#000000;"><span style="font-weight:600;color:#000000;">Heard about us:</span> <span style="font-weight:400;color:#000000;"><font color="#000000">${heardHtml}</font></span></p>
			</div>
		</body>
		</html>`;
        const sendResult = await resend.emails.send({
			from: fromAddress,
            to: toAddress,
			subject,
            html: minimalHtml,
            text: plain,
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
