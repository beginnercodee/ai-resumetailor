'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ResultContent() {
  const searchParams = useSearchParams()
  const job = searchParams.get('job')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-6 border border-white/10"
    >
      <h2 className="text-2xl font-bold text-center">Tailored Resume Result</h2>
      <p className="text-sm text-white/80">
        <strong>Job Description:</strong> {job || 'No job description found.'}
      </p>
    </motion.div>
  )
}
