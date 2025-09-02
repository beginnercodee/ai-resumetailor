'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function JobDescriptionPage() {
  const router = useRouter()
  const [jobDesc, setJobDesc] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobDesc.trim()) return
    const encodedJob = encodeURIComponent(jobDesc.trim())
    router.push(`/result?job=${encodedJob}`)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#4B79A1] to-[#283E51] text-white px-4 py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-6 border border-white/10"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Paste the Job Description</h2>

          <div className="space-y-4">
            <label htmlFor="jobText" className="block text-white text-sm font-medium">
              Job Description:
            </label>
            <Textarea
              id="jobText"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[200px] text-white placeholder:text-gray-400 bg-white/10 border border-white/20"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="px-6 py-2 rounded-xl hover:scale-105 transition" disabled={!jobDesc.trim()}>
              Tailor Resume
            </Button>
          </div>
        </form>
      </motion.div>
    </main>
  )
}
