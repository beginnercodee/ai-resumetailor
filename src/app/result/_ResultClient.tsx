"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResultContent from "./result-content";
import confetti from "canvas-confetti";

export default function ResultClient() {
  const searchParams = useSearchParams();
  const dataKey = searchParams.get("key");
  const jobParam = searchParams.get("job");
  const resumeParam = searchParams.get("resume");

  const [job, setJob] = useState<string | null>(null);
  const [resume, setResume] = useState<string | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  // Load data from URL params or sessionStorage (client-side only)
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    if (dataKey) {
      // Get data from sessionStorage if key is provided (for long content)
      try {
        const storedData = sessionStorage.getItem(dataKey);
        console.log("🔍 Reading from sessionStorage with key:", dataKey, "Found:", !!storedData);
        if (storedData) {
          const parsed = JSON.parse(storedData);
          console.log("✅ Loaded from sessionStorage:", {
            jobLength: parsed.job?.length || 0,
            resumeLength: parsed.resume?.length || 0,
            hasJob: !!parsed.job,
            hasResume: !!parsed.resume
          });
          
          // Set both values
          const jobValue = parsed.job || null;
          const resumeValue = parsed.resume || null;
          
          if (!jobValue || !resumeValue) {
            console.error("❌ Invalid data in sessionStorage - missing job or resume");
            setResult("❌ Error: Invalid resume data. Please go back and try again.");
            setLoading(false);
            return;
          }
          
          setJob(jobValue);
          setResume(resumeValue);
          
          // Clean up sessionStorage after a delay to ensure state is set and API call starts
          setTimeout(() => {
            try {
              sessionStorage.removeItem(dataKey);
              console.log("🗑️ Cleaned up sessionStorage for key:", dataKey);
            } catch (e) {
              console.warn("Failed to clean up sessionStorage:", e);
            }
          }, 500);
        } else {
          console.error("❌ No data found in sessionStorage for key:", dataKey);
          setResult("❌ Error: Resume data not found. Please go back and try again.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to read from sessionStorage:", error);
        setResult("❌ Error: Failed to load resume data. Please go back and try again.");
        setLoading(false);
      }
    } else {
      // useSearchParams().get() automatically decodes URL parameters
      // So we can use them directly without additional decoding
      console.log("📥 Loading from URL params:", {
        hasJob: !!jobParam,
        hasResume: !!resumeParam,
        jobLength: jobParam?.length || 0,
        resumeLength: resumeParam?.length || 0
      });
      setJob(jobParam);
      setResume(resumeParam);
    }
  }, [dataKey, jobParam, resumeParam]);

  useEffect(() => {
    console.log("🔄 API Effect triggered:", { job: !!job, resume: !!resume, jobLength: job?.length, resumeLength: resume?.length });
    
    // Wait for data to be loaded (both should be set, not null)
    if (job === null || resume === null) {
      console.log("⏳ Waiting for data to load...");
      return;
    }

    let isMounted = true;
    const abortController = new AbortController();

    const generate = async () => {
      if (!job || !resume || job.trim() === "" || resume.trim() === "") {
        if (isMounted) {
          console.warn("⚠️ Missing job or resume in query:", { 
            job: job ? job.slice(0, 50) + "..." : null, 
            resume: resume ? resume.slice(0, 50) + "..." : null 
          });
          setResult("❌ Error: Missing job description or resume. Please go back and try again.");
          setLoading(false);
        }
        return;
      }

      if (!isMounted) return;

      console.log("📤 Sending to API:", {
        jobLength: job.length,
        resumeLength: resume.length,
        jobPreview: job.slice(0, 100) + "...",
        resumePreview: resume.slice(0, 100) + "..."
      });

      setLoading(true);

      try {
        const response = await fetch("/api/tailor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job, resume }),
          signal: abortController.signal,
        });

        if (!isMounted) return;

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          
          // Handle rate limit errors specifically
          if (response.status === 429) {
            throw new Error(
              errorData.error || 
              `⏳ Rate limit exceeded. The free tier has usage limits. Please wait a few minutes and try again. ${errorData.details || ''}`
            );
          }
          
          throw new Error(errorData.error || errorData.details || `API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!isMounted) return;

        const tailored = data.result || "No result found";
        setResult(tailored);

        if (tailored && tailored !== "No result found" && !tailored.startsWith("❌")) {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        
        if (isMounted) {
          console.error("❌ Client error calling /api/tailor:", err);
          const errorMessage = err instanceof Error ? err.message : "Unknown error";
          setResult(`❌ Error generating resume: ${errorMessage}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    generate();

    // Cleanup function
    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [job, resume]);

  return <ResultContent result={result} loading={loading} />;
}
