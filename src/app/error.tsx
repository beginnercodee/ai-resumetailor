'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        We encountered an unexpected error while processing your request. Please try again or return to the homepage.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="px-6 py-3 font-medium text-blue-600 bg-blue-50 dark:bg-slate-800 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
