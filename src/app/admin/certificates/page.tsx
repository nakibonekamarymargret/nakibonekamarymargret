"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import CertTable from "./Table";

const CertList = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Certificates</h2>
            <p className="text-gray-400 text-sm">
              Hi Mary ❤️ manage your certificates — add, edit or remove them.
            </p>
          </div>
          <button
            onClick={() => router.push("/admin/certificates/form")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            + Add Certificate
          </button>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-8">Loading certificates...</div>
          }
        >
          <CertTable />
        </Suspense>
      </div>
    </div>
  );
};

export default CertList;
