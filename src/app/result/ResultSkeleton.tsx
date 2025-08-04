// src/app/result/ResultSkeleton.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ResultSkeleton() {
  return (
    <div className="w-full max-w-4xl space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-[90%]" />
      <Skeleton className="h-4 w-[95%]" />
      <Skeleton className="h-4 w-[80%]" />
    </div>
  );
}
