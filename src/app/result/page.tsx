import { Suspense } from 'react'
import ResultContent from './result-content'

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] px-4 py-12 text-white flex justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <ResultContent />
      </Suspense>
    </main>
  )
}
