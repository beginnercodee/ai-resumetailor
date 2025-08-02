'use client'

import { useSearchParams } from 'next/navigation'

export default function ResultClient() {
  const searchParams = useSearchParams()
  const resume = searchParams.get('resume') || ''
  const job = searchParams.get('job') || ''

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Tailored Resume:</h2>
      <div className="p-4 bg-white/10 text-white rounded-xl border border-white/20 whitespace-pre-wrap">
        <p><strong>Resume:</strong> {resume}</p>
        <p className="mt-2"><strong>Job Description:</strong> {job}</p>
      </div>
    </div>
  )
}
