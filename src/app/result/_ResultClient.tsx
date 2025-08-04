"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResultContent from "./result-content";
import confetti from "canvas-confetti";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const job = searchParams.get("job");
  const resume = searchParams.get("resume");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generate = async () => {
      if (!job || !resume) return;

      setLoading(true);

      try {
        const response = await fetch("/api/tailor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job, resume }),
        });

        const data = await response.json();
        const tailored = data.result || "No result found";
        setResult(tailored);

        // 🎉 Trigger confetti only if successful
        if (
          tailored &&
          tailored !== "No result found" &&
          !tailored.startsWith("❌")
        ) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      } catch (err) {
        console.error(err);
        setResult("❌ Error generating resume");
      } finally {
        setLoading(false);
      }
    };

    generate();
  }, [job, resume]);

  return <ResultContent result={result} loading={loading} />;
}
