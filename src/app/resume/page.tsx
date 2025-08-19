"use client";

import dynamic from "next/dynamic";

const ResumeEditor = dynamic(() => import("./ResumeEditor"), {
  ssr: false, // 👈 disables server-side rendering
});

export default function Page() {
  return <ResumeEditor />;
}
