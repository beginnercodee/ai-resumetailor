// src/app/api/generate-pdf/route.ts
import { NextResponse } from "next/server";
import { jsPDF } from "jspdf";

// ✅ Run in Node.js runtime (not Edge)
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { text = "", title = "Tailored Resume" } = await req.json();

    console.log("📄 PDF API called with:", { title, textLength: text.length });

    // Create PDF using jsPDF (works better with Next.js)
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "letter", // 8.5 x 11 inches
    });

    // Set margins
    const margin = 20; // 20mm margins
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - 2 * margin;

    // Add title (centered)
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, margin + 10);

    // Add content
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    // Split text into lines that fit the page width
    const lines = doc.splitTextToSize(text || "(No content)", maxWidth);
    let yPosition = margin + 25; // Start below title

    // Add text line by line, handling page breaks
    lines.forEach((line: string) => {
      if (yPosition > pageHeight - margin - 10) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7; // Line height
    });

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Tailored_Resume.pdf"',
      },
    });
  } catch (err) {
    console.error("❌ generate-pdf outer error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to generate PDF", details: errorMessage }, 
      { status: 500 }
    );
  }
}
