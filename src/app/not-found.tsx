'use client';

import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <FileQuestion className="w-24 h-24 mb-6 text-gray-400 dark:text-gray-600" />
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        We couldn&apos;t find the page you were looking for. The link might be broken or the page may have been removed.
      </p>
      <Link 
        href="/"
        className="px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform hover:scale-105"
      >
        Return Home
      </Link>
    </div>
  );
}
