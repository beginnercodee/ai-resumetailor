'use client'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function JobDescriptionPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4B79A1] to-[#283E51] text-white px-4 py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-6 border border-white/10"
      >
        <h2 className="text-3xl font-bold text-center">Paste the Job Description</h2>

        <div className="space-y-4">
          <label htmlFor="jobText" className="block text-white text-sm font-medium">
            Job Description:
          </label>
          <Textarea
            id="jobText"
            placeholder="Paste the job description here..."
            className="min-h-[200px] text-white placeholder:text-gray-400 bg-white/10 border border-white/20"
          />
        </div>

        <div className="flex justify-end">
          <Button className="px-6 py-2 rounded-xl hover:scale-105 transition">
            Tailor Resume
          </Button>
        </div>
      </motion.div>
    </main>
  )
}
