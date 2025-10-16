import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import ProjectForm for proper suspense handling
const ProjectForm = dynamic(
  () => import("./ProjectForm"),
  // { ssr: false } // disables SSR for this component
);

export default function ProjectFormPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-gray-100">Loading form...</div>}
    >
      <ProjectForm />
    </Suspense>
  );
}
