"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface SkillData {
  id?: string; // Optional for creation
  category: string; // e.g., "Programming Languages"
  name: string; // e.g., "Python"
  icon?: string; // Optional icon for the skill
  order: number; // e.g., 0 for default sorting
  published: boolean; // Whether the skill is published or not
}

// Define common input style for consistency
const inputFieldClass =
  "w-full border border-gray-300 bg-white text-gray-900 p-3 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150 shadow-sm";

const SkillForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id"); // ID exists if editing

  const [skill, setSkill] = useState<SkillData>({
    category: "",
    name: "",
    order: 0,
    published: true,
  });

  // 1. READ: Fetch existing skill data if ID is present (Edit Mode)
  useEffect(() => {
    if (id) {
      fetch(`/api/skills?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setSkill(data.data); // Update form with existing skill data
          }
        })
        .catch((err) => console.error("Failed to fetch skill:", err));
    }
  }, [id]);

  // Handle simple text input changes
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // Convert 'order' to an integer if it's the 'order' field
  setSkill((prev) => ({
    ...prev,
    [name]: name === "order" ? parseInt(value, 10) : value,
  }));
};

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setSkill((prev) => ({ ...prev, published: checked }));
  };

  // 2. CREATE/UPDATE: Handle form submission
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const method = id ? "PUT" : "POST";
  const body = id ? { ...skill, id } : skill;

  console.log("Submitting data:", body); // Log the data being submitted

  try {
    const res = await fetch("/api/skills", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error from API:", errorData);
      alert(`❌ Error: ${errorData.message || "Unknown error"}`);
      return;
    }

    const data = await res.json();
    if (data.success) {
      router.push("/admin/skills");
    } else {
      alert(`❌ Error: ${data.message || "Unknown error"}`);
    }
  } catch (error) {
    console.error("Error while submitting:", error);
    alert("❌ Something went wrong.");
  }
};


  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-6 text-purple-700">
        {id ? "Edit Skill" : "Add New Skill"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-pink-50 p-6 rounded-xl shadow-xl border border-pink-200"
      >
        {/* Skill Category */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Category
          </label>
          <input
            name="category"
            value={skill.category}
            onChange={handleChange}
            placeholder="e.g. Programming Languages"
            className={inputFieldClass}
            required
          />
        </div>

        {/* Skill Name */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Skill Name
          </label>
          <input
            name="name"
            value={skill.name}
            onChange={handleChange}
            placeholder="e.g. JavaScript"
            className={inputFieldClass}
            required
          />
        </div>

        {/* Skill Icon */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Icon (optional)
          </label>
          <input
            name="icon"
            value={skill.icon || ""}
            onChange={handleChange}
            placeholder="e.g. 'python-icon.png'"
            className={inputFieldClass}
          />
        </div>

        {/* Skill Order */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Order</label>
          <input
            type="number"
            name="order"
            value={skill.order}
            onChange={handleChange}
            className={inputFieldClass}
            required
          />
        </div>

        {/* Published Checkbox */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={skill.published}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            Published
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-right">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-bold transition shadow-lg"
          >
            {id ? "Update Skill" : "Add Skill"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SkillForm;
