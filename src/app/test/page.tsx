"use client";

import { useEffect, useState } from "react";

export default function TailorApiTestPage() {
  const [result, setResult] = useState("Waiting...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const testApi = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/tailor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            job: "Frontend Developer with React experience",
            resume:
              "Skilled in HTML, CSS, JavaScript, and React. Built multiple responsive UI components using Tailwind CSS and integrated APIs using Fetch and Axios.",
          }),
        });

        const data = await response.json();
        setResult(data.result || "❌ No result returned");
      } catch (err: unknown) {
  console.error(err);
  setResult("❌ Error calling /api/tailor");
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-2xl font-bold text-center">🎯 /api/tailor Test</h1>
        <p className="text-sm text-gray-400 text-center">
          This page calls the `/api/tailor` endpoint on load.
        </p>
        <div className="bg-white text-black p-4 rounded-xl shadow-md whitespace-pre-wrap">
          {loading ? "⏳ Loading..." : result}
        </div>
      </div>
    </main>
  );
}
