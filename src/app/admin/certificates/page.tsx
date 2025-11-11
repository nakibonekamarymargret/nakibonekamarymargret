"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Certificate {
  id?: string;
  name: string;
  institute?: string;
}

const CertificatesAdmin = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [formData, setFormData] = useState<Certificate>({
    name: "",
    institute: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchCertificates();
    const id = searchParams.get("id");
    if (id) {
      fetchCertificate(id);
    }
  }, [searchParams]);

  const fetchCertificates = async () => {
    const res = await fetch("/api/certificates");
    const data = await res.json();
    if (data.success) setCertificates(data.data);
  };

  const fetchCertificate = async (id: string) => {
    const res = await fetch(`/api/certificates?id=${id}`);
    const data = await res.json();
    if (data.success) {
      setFormData(data.data);
      setEditingId(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const body = editingId ? { ...formData, id: editingId } : formData;

    const res = await fetch("/api/certificates", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.success) {
      setFormData({ name: "", institute: "" });
      setEditingId(null);
      fetchCertificates();
      router.push("/admin/certificates");
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

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Certificate Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Institute (Optional)
          </label>
          <input
            type="text"
            value={formData.institute || ""}
            onChange={(e) =>
              setFormData({ ...formData, institute: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"} Certificate
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", institute: "" });
              router.push("/admin/certificates");
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </form>

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

export default CertificatesAdmin;
