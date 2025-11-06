import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const SkillForm = dynamic(
  () => import("./SkillForm"),
);

export default function SkillFormPage() {
  return (
    <Suspense
      fallback={<div className="p-10 text-gray-100">Loading form...</div>}
    >
      <SkillForm />
    </Suspense>
  );
}
