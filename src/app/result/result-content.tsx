'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Loader2 } from "lucide-react";

export default function ResultContent({
  result,
  loading,
}: {
  result: string | null;
  loading: boolean;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!loading && result) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [loading, result]);

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
      transition={{ duration: 0.5, ease: 'easeOut' }}
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
            <p className="text-white/80 text-sm">✅ Resume tailored successfully</p>
            <motion.button
  onClick={handleCopy}
  whileTap={{ scale: 0.9 }}
  className="px-3 py-1 text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-md transition"
>
  {copied ? "✅ Copied!" : "📋 Copy"}
</motion.button>

          </div>

          <pre className="whitespace-pre-wrap bg-white/10 border border-white/20 p-4 rounded-xl text-white text-sm md:text-base overflow-auto">
            {result}
          </pre>
        </>
      ) : (
        <p className="text-center text-white/80">No result available.</p>
      )}
    </motion.div>
  );
}
