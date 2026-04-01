import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Resume Tailor | Optimize Your Job App",
  description: "Instantly tailor your resume for any job description using advanced AI to highlight your most relevant skills and experience.",
  keywords: ["AI resume", "resume builder", "career tools", "job application", "resume optimizer"],
  openGraph: {
    title: "AI Resume Tailor",
    description: "Instantly tailor your resume for any job description using advanced AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Resume Tailor",
    description: "Instantly tailor your resume for any job description using advanced AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
