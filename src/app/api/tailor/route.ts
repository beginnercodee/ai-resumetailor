// app/api/tailor/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(req: Request) {
  try {
    const { job, resume } = await req.json();

    // Validate required fields
    if (!job || !resume) {
      return NextResponse.json(
        { error: 'Job description and resume are required' },
        { status: 400 }
      );
    }

    // Validate API key
    if (!process.env.GOOGLE_API_KEY) {
      console.error('❌ GOOGLE_API_KEY is not set');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Estimate token count (roughly 1 token ≈ 4 characters for English)
    // Free tier has limits, so truncate if needed
    const MAX_JOB_CHARS = 2000; // ~500 tokens
    const MAX_RESUME_CHARS = 3000; // ~750 tokens
    
    const truncatedJob = job.length > MAX_JOB_CHARS 
      ? job.substring(0, MAX_JOB_CHARS) + "...[truncated]" 
      : job;
    const truncatedResume = resume.length > MAX_RESUME_CHARS 
      ? resume.substring(0, MAX_RESUME_CHARS) + "...[truncated]" 
      : resume;

    console.log("🔎 Input sizes:", {
      jobOriginal: job.length,
      jobTruncated: truncatedJob.length,
      resumeOriginal: resume.length,
      resumeTruncated: truncatedResume.length,
      estimatedTokens: Math.ceil((truncatedJob.length + truncatedResume.length) / 4)
    });

    // Optimized, concise prompt to reduce token usage
    const prompt = `Tailor this resume for the job. Highlight relevant skills and experience. Keep the same format.

Job: ${truncatedJob}

Resume: ${truncatedResume}

Tailored Resume:`;

    // Use a valid Gemini model name
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Retry logic with exponential backoff for rate limits
    let result;
    let lastError;
    const maxRetries = 3;
    const baseDelay = 1000; // 1 second
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        result = await model.generateContent(prompt);
        break; // Success, exit retry loop
      } catch (error: any) {
        lastError = error;
        
        // Check if it's a rate limit error (429)
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('rate')) {
          if (attempt < maxRetries - 1) {
            // Calculate exponential backoff delay
            const delay = baseDelay * Math.pow(2, attempt);
            console.log(`⏳ Rate limit hit. Retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue; // Retry
          } else {
            // Last attempt failed
            throw new Error('Rate limit exceeded. Please wait a moment and try again. Free tier has usage limits.');
          }
        } else {
          // Not a rate limit error, throw immediately
          throw error;
        }
      }
    }
    
    if (!result) {
      throw lastError || new Error('Failed to generate content');
    }
    
    const text = result.response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Handle rate limit errors specifically
    if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('rate limit')) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded', 
          details: 'You\'ve exceeded the free tier quota. Please wait a few minutes and try again, or consider upgrading your API plan.',
          retryAfter: 60 // Suggest waiting 60 seconds
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: 'Something went wrong', details: errorMessage },
      { status: 500 }
    );
  }
}
