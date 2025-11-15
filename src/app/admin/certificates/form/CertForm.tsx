"use client";

import React, { useEffect, useState } from "react";
import { Certificates } from "../../../types/interface";
import { Certificate } from "@prisma/client";

const useSearchParams = () => {
  // This is a placeholder that simulates reading an 'id' from the URL for the purposes of this standalone environment.
  // In a real Next.js app, this logic would not be needed.
  const urlParams = new URLSearchParams(window.location.search);
  return {
    get: (key: string) => urlParams.get(key),
  };
};
const useRouter = () => {
  return {
    push: (path: string) => console.log(`Navigating to: ${path}`),
  };
};

const CertForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [certificate, setCertificate] = useState<Certificates>({
    name: "",
  institute: ""
  // category?: string
  });

  const [editingId, setEditingId] = useState<string | null>(null);


  useEffect(() => {
    if (id) {
      fetch(`/api/certificate?id = ${id}`)
        .then((res) => res.json())
      .then((data) => data.success && setCertificate(data.data))
    }
    
  }, [id]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCertificate((prev: Certificates) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const body = id ? { ...certificate, id } : certificate;
    
    await fetch("/api/certificates", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

      router.push("/admin/certificates");
    
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this certificate?")) return;

    const res = await fetch(`/api/certificates?id=${id}`, {
      method: "DELETE",
    });

  
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Certificates</h1>

      <h2 className="text-3xl mx-auto font-bold mb-8 text-gray-800">
        {id ? "Edit Certificate" : "Add new Certificate"}
      </h2>

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
            value={certificate.name}
            onChange={handleChange}
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
            value={certificate.institute}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {id ? "Update Certificate" : "Add Certificate"}
          </button>
        </div>
      </form>

      
    </div>
  );
};

export default CertForm;
