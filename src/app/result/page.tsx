import { Suspense } from 'react'
import ResultClient from './_ResultClient'

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1D2B64] to-[#f8cdda] px-4 py-12 text-white flex justify-center">
      <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-3xl border border-white/10">
        <Suspense fallback={<p className="text-center text-white">Loading...</p>}>
          <ResultClient />
        </Suspense>
      </div>
    </main>
  )
}
