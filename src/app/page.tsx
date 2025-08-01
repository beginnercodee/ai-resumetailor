// app/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/5 p-10 rounded-2xl shadow-lg max-w-2xl text-center border border-white/10"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ResumeTailor <span className="text-pink-500">AI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Instantly tailor your resume to match any job description — with the power of AI.
        </p>
        <Button className="text-base px-6 py-4 rounded-xl hover:scale-105 transition">
          Tailor My Resume
        </Button>
      </motion.div>
    </main>
  )
}
