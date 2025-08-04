import { Suspense } from "react";
import ResultClient from "./_ResultClient";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#283E51] to-[#485563] text-white px-4 py-12 flex justify-center">
      <Suspense fallback={<p className="text-white/70">Loading...</p>}>
        <ResultClient />
      </Suspense>
    </main>
  );
}
