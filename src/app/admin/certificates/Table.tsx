"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Certificate {
  id?: string;
  name: string;
  institute?: string;
}

const CertTable = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const router = useRouter();

  const fetchCertificates = async () => {
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      if (data.success) {
        setCertificates(data.data);
      }
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;

    try {
      const res = await fetch(`/api/certificates?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        fetchCertificates();
      }
    } catch (error) {
      console.error("Error deleting certificate:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
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
            {certificates.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No certificates yet. Add your first one!
                </td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr key={cert.id} className="border-b">
                  <td className="py-2">{cert.name}</td>
                  <td className="py-2">{cert.institute || "-"}</td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() =>
                        router.push(`/admin/certificates/form?id=${cert.id}`)
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertTable;
