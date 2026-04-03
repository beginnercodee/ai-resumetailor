"use client";

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import useSound from "use-sound";
import ReactMarkdown from "react-markdown";

export default function ResultContent({
  result,
  loading,
}: {
  result: string | null;
  loading: boolean;
}) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [play] = useSound("/sound-effect-4769.mp3");

  useEffect(() => {
    if (!loading && result) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
      play(); // 🔊 Play the sound
    }
  }, [loading, result, play]);

  const handleDownloadPdf = async () => {
    if (!result || !resumeRef.current) return;
    try {
      // Import html2pdf dynamically so it doesn't break SSR
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = resumeRef.current;
      const opt = {
        margin:       15,
        filename:     'Tailored_Resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF download error:", err);
    }
  };


  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="p-6 md:p-8 max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 space-y-6"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
        🎯 Tailored Resume
      </h2>

      {loading ? (
        <div className="flex flex-col items-center space-y-4 animate-pulse">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>⏳ Tailoring your resume...</span>
          </div>
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
          <div className="h-4 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-5/6" />
          <div className="h-4 bg-white/10 rounded w-3/4" />
          <div className="h-4 bg-white/10 rounded w-4/6" />
          <div className="h-4 bg-white/10 rounded w-full" />
        </div>
      ) : result ? (
        <>
          <div className="flex justify-between items-center mb-2">
            <p className="text-white/80 text-sm">
              ✅ Resume tailored successfully
            </p>
            <motion.button
              onClick={handleCopy}
              whileTap={{ scale: 0.9 }}
              className="no-print px-3 py-1 text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-md transition"
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </motion.button>
          </div>

          {/* White Paper Canvas for PDF Rendering */}
          <div className="bg-white text-black p-8 rounded-xl overflow-auto w-full shadow-inner border border-gray-200">
            <div ref={resumeRef} className="font-sans text-sm md:text-base text-gray-800">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-[#1e3a8a] border-b-2 border-slate-200 pb-2 mb-4 mt-6 tracking-wide" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-bold text-[#1e40af] border-b border-slate-200 pb-1 mb-3 mt-5 tracking-wide" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-900 mb-2 mt-4" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1 text-gray-700" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1 text-gray-700" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-gray-800" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="no-print mt-6 px-6 py-3 bg-blue-600 border border-blue-500 text-white font-medium rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95 duration-200"
          >
            Download Formatted PDF
          </button>
          <div className="text-center text-white/60 text-xs mt-4">
            Tailored with ❤️ by AI Resume Tailor
          </div>
        </>
        
      ) : (
        <p className="text-center text-white/80">No result available.</p>
      )}
    </motion.div>
  );
}
