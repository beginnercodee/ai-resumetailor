'use client'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Upload } from 'lucide-react'
import { useRouter } from "next/navigation";


export default function ResumeEditorPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2c3e50] to-[#4ca1af] text-white px-4 py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-3xl space-y-6 border border-white/10"
      >
        <h2 className="text-3xl font-bold text-center">Upload or Paste Your Resume</h2>

        <div className="space-y-4">
          <label htmlFor="resumeText" className="block text-white text-sm font-medium">
            Paste Resume Text:
          </label>
          <Textarea
            id="resumeText"
            placeholder="Paste your resume text here..."
            className="min-h-[200px] text-white placeholder:text-gray-400 bg-white/10 border border-white/20"
          />
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
            <Upload className="w-4 h-4 mr-2" /> Upload PDF
          </Button>
          <Button
  className="px-6 py-2 rounded-xl hover:scale-105 transition"
  onClick={() => router.push("/job")}
>
  Next: Add Job Description
</Button>

        </div>
      </motion.div>
    </main>
  )
}
