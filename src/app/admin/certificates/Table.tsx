"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Certificate {
  id?: string;
  name: string;
  institute?: string;
}

const CertTable = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
 
  const router = useRouter();
  const searchParams = useSearchParams();
  
const fetchCertificates = async () => {
  const res = await fetch("/api/certificates");
  const data = await res.json();
  if (data.success) setCertificates(data.data);
};
  useEffect(() => {
    fetchCertificates();
    const id = searchParams.get("id");
    if (id) {
      fetchCertificate(id);
    }
  }, [searchParams]);

  

  const fetchCertificate = async (id: string) => {
    const res = await fetch(`/api/certificates?id=${id}`);
    const data = await res.json();
    if (data.success) {
    }
  };



  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;

    const res = await fetch(`/api/certificates?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      fetchCertificates();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Certificates</h1>

     

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Certificates List</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Institute</th>
              <th className="text-center py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((cert) => (
              <tr key={cert.id} className="border-b">
                <td className="py-2">{cert.name}</td>
                <td className="py-2">{cert.institute || "-"}</td>
                <td className="py-2 text-center">
                  <button
                    onClick={() =>
                      router.push(`/admin/certificates?id=${cert.id}`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertTable;
