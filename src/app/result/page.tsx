import { Suspense } from 'react';
import ResultClient from "./_ResultClient";

export default function ResultPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResultClient />
    </Suspense>
  );
}
