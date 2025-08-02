'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ResultContent from './result-content';

export default function ResultClient() {
  const searchParams = useSearchParams();
  const job = searchParams.get('job');
  const resume = searchParams.get('resume');

  const [tailored, setTailored] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (job && resume) {
    setLoading(true);
    console.log('Calling API with:', { job, resume });
    fetch('/api/tailor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ job, resume }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('API response:', data);
        setTailored(data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API error:', err);
        setLoading(false);
      });
  }
}, [job, resume]);


  return <ResultContent result={tailored} loading={loading} />;
}
