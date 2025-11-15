
export const dynamic = "force-dynamic"; // Disable static pre-rendering

import React, { Suspense } from "react";
import CertForm from "./CertForm";

export default function CertFormPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-gray-100">Loading form...</div>}
    >
      <CertForm />
    </Suspense>
  );
}
