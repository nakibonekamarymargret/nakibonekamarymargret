import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import ExperienceForm for proper suspense handling
const ExperienceForm = dynamic(
  () => import("./ExperienceForm"),
  // { ssr: false } // disables SSR for this component
);

export default function ExperienceFormPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-gray-100">Loading form...</div>}
    >
      <ExperienceForm />
    </Suspense>
  );
}
