'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function ResultPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleGenerate = () => {
    setLoading(true)
    setResult(null)
    // Simulate AI API call delay
    setTimeout(() => {
      setResult(
        `John Doe
Software Engineer

Tailored to: Senior Frontend Developer role at XYZ Corp

- Enhanced React application with Tailwind CSS and Framer Motion
- Collaborated in agile teams to deliver high-quality UI/UX
- Improved performance by 30% through code optimization
`
      )
      setLoading(false)
    }, 2500)
  }

  return (
    <main className="min-h-screen bg-gradient-to-tr from-purple-700 to-indigo-900 text-white px-4 py-12 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-3xl w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Tailored Resume</h2>

        <div className="mb-6">
          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3 rounded-xl text-lg font-semibold hover:scale-105 transition"
          >
            {loading ? 'Generating...' : 'Generate Tailored Resume'}
          </Button>
        </div>

        {result && (
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-pre-wrap bg-white/20 p-6 rounded-lg font-mono text-sm"
          >
            {result}
          </motion.pre>
        )}
      </motion.div>
    </main>
  )
}
