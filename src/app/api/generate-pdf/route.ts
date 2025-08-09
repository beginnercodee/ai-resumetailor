// src/app/api/generate-pdf/route.ts
import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

// ✅ Run in Node.js runtime (not Edge)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text = "", title = "Tailored Resume" } = await req.json();

    console.log("📄 PDF API called with:", { title, textLength: text.length });

    const doc = new PDFDocument({ size: "LETTER", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("error", (err) => {
      console.error("❌ PDFKit internal error:", err);
    });

    const finished = new Promise<void>((resolve, reject) => {
      doc.on("end", () => resolve());
      doc.on("error", reject);
    });

    doc.fontSize(18).text(title, { align: "center" });
    doc.moveDown();
    doc.font("Times-Roman").fontSize(12).text(text || "(No content)", { align: "left" });

    doc.end();
    await finished;

    const pdfBuffer = Buffer.concat(chunks);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Tailored_Resume.pdf"',
      },
    });
  } catch (err) {
    console.error("❌ generate-pdf outer error:", err);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}
