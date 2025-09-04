import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "public", "KnownVisitors Terms of Service.pdf");
    const dataBuffer = fs.readFileSync(pdfPath);
    const { default: pdfParse } = await import("pdf-parse");
    const data = await pdfParse(dataBuffer);
    return new Response(JSON.stringify({ text: data.text || "" }), {
      headers: { "content-type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ text: "" }), {
      headers: { "content-type": "application/json" },
      status: 200,
    });
  }
}


