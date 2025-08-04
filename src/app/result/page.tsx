// src/app/result/page.tsx
import { Suspense } from "react";
import ResultClient from "./_ResultClient";
import ResultSkeleton from "./ResultSkeleton";

export default function ResultPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#283E51] to-[#485563] text-white px-4 py-12 flex justify-center">
      <Suspense fallback={<ResultSkeleton />}>
        <ResultClient />
      </Suspense>
    </main>
  );
}
