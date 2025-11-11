import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Define Skill type
interface Skill {
  id: string;
  category: string;
  name: string;
  icon?: string;
  order: number;
  published: boolean;
}

// Define type for grouped skills (object where key is category, and value is array of Skills)
interface GroupedSkills {
  [category: string]: Skill[];
}

const SkillTable = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const router = useRouter();

  const fetchSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    if (data.success) {
      setSkills(data.data);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Handle delete skill
  const deleteSkill = async (id: string) => {
    const res = await fetch(`/api/skills?id=${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      setSkills((prev) => prev.filter((skill) => skill.id !== id));
    } else {
      alert("Failed to delete skill.");
    }
  };

  // Group skills by category
  const groupedSkills: GroupedSkills = skills.reduce(
    (acc: GroupedSkills, skill: Skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    },
    {} as GroupedSkills
  ); // Ensure acc is typed as GroupedSkills

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full  shadow-md border">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Skill</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedSkills).map((category) => (
            <React.Fragment key={category}>
              <tr className="bg-gray-100">
                <td colSpan={3} className="py-3 px-6 font-semibold">
                  {category}
                </td>
              </tr>
              {groupedSkills[category].map((skill) => (
                <tr key={skill.id}>
                  <td className="py-3 px-6">{skill.category}</td>
                  <td className="py-3 px-6">{skill.name}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg"
                      onClick={() =>
                        router.push(`/admin/skills?id=${skill.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      onClick={() => deleteSkill(skill.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillTable;
