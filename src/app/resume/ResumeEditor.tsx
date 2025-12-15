"use client";

import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

// Type definitions for PDF.js CDN
interface PDFTextItem {
  str: string;
  dir?: string;
  width?: number;
  height?: number;
  transform?: number[];
  fontName?: string;
}

interface PDFTextContent {
  items: PDFTextItem[];
}

interface PDFPageProxy {
  getTextContent(): Promise<PDFTextContent>;
}

interface PDFDocumentProxy {
  numPages: number;
  getPage(pageNumber: number): Promise<PDFPageProxy>;
}

interface PDFJSStatic {
  getDocument(options: { data: Uint8Array }): {
    promise: Promise<PDFDocumentProxy>;
  };
  GlobalWorkerOptions: {
    workerSrc: string;
  };
}

declare global {
  interface Window {
    pdfjsLib: PDFJSStatic;
  }
}

export default function ResumeEditor() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resumeText, setResumeText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    setIsProcessing(true);

    try {
      // Method 1: Using CDN version directly (most reliable)
      if (typeof window !== "undefined") {
        // Load PDF.js from CDN
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";

        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });

        // Set worker
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        const fileReader = new FileReader();
        fileReader.onload = async () => {
          try {
            const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
            const pdf = await window.pdfjsLib.getDocument({ data: typedArray })
              .promise;

            let fullText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const textContent = await page.getTextContent();
              const pageText = textContent.items
                .map((item: PDFTextItem) => item.str || "")
                .join(" ");
              fullText += pageText + "\n";
            }

            setResumeText(fullText.trim());
          } catch (err) {
            console.error("Error processing PDF:", err);
            alert(
              "Failed to extract text from PDF. Please try copying and pasting the text instead."
            );
          } finally {
            setIsProcessing(false);
          }
        };
        fileReader.readAsArrayBuffer(file);
      }
    } catch (err) {
      console.error("Error loading PDF.js:", err);
      alert(
        "Failed to load PDF processor. Please try copying and pasting the text instead."
      );
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#4ca1af] text-white px-4 py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-6 border border-white/10"
      >
        <h2 className="text-3xl font-bold text-center">
          Upload or Paste Your Resume
        </h2>

        <div className="space-y-4">
          <label
            htmlFor="resumeText"
            className="block text-white text-sm font-medium"
          >
            Paste Resume Text:
          </label>
          <Textarea
            id="resumeText"
            placeholder="Paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[200px] text-white placeholder:text-gray-400 bg-white/10 border border-white/20"
          />
        </div>

        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            className="border-white/30 bg-white/10 text-white hover:bg-white/20 flex items-center"
            onClick={handleUploadClick}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isProcessing ? "Processing..." : "Upload PDF"}
          </Button>

          <Button
            className="px-6 py-2 rounded-xl hover:scale-105 transition"
            onClick={() => {
              // Encode resume text and pass it to job page
              const encodedResume = encodeURIComponent(resumeText.trim());
              router.push(`/job?resume=${encodedResume}`);
            }}
            disabled={!resumeText.trim()} // 👈 works both for paste + upload
          >
            Next: Add Job Description
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
