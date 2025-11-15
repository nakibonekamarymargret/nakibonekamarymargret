"use client";

export const dynamic = "force-dynamic"; // Disable static pre-rendering

import React, { Suspense } from "react";
import ProjectForm from "./ProjectForm";

export default function ProjectFormPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-gray-100">Loading form...</div>}
    >
      <ProjectForm />
    </Suspense>
  );
}
