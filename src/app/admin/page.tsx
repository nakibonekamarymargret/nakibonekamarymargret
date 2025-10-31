"use client";

import { useRouter } from "next/navigation";
import React from "react";
import ProjectTable from "./projects/Table";
import ExperienceTable from "./experiences/Table";
import SkillsTable from "./skills/Table";

// icons
import { CiEdit } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaLocationDot, FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";



/**
 * AdminSection Component: Wraps content in a consistent, clean card layout.
 * @param {string} title - The title of the section.
 * @param {React.ReactNode} children - The content (e.g., a table) to display inside the card.
 * @param {string} formPath - The URL path for the "Add" button (optional).
 * @param {object} router - The Next.js router object.
 */
const AdminSection = ({
  title,
  children,
  formPath,
  router,
  fullWidth = false,
}) => (
  <div
    className={` p-6 rounded-xl  border border-gray-50  mb-8  top-4 transition-shadow duration-300 hover:shadow-2xl ${fullWidth ? "lg:col-span-3 md:col-span-2" : ""}`}
  >
    <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      {formPath && (
        <button
          onClick={() => router.push(formPath)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md transition duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          +  {title.split(" ")[0]}
        </button>
      )}
    </div>
    {children}
  </div>
);

const Admin = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 sm:p-8 pt-16">
      <div className="max-w-7xl mx-auto">
        {/* Your entire grid content goes here */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Welcome Message Banner (already has col-span-full) */}
          <div className="p-5 mb-8 pb-22 bg-gradient-to-r from-indigo-50 to-white rounded-xl   col-span-full">
            <p className="text-gray-800 text-xl font-medium text-center">
              Hi <b>Mary</b>! <br />
              Everything will be okay, keep pushing and trusting in{" "}
              <b>God 🙏</b>
            </p>
          </div>
        </div>
        {/* Section 0: My Info (Sits on top, spans 3 columns on large screens) */}
        <AdminSection
          title=""
          formPath="/admin/info/edit" // Example path for editing personal info
          router={router}
          fullWidth={true}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 ">
            {/* My Pic - Like your design */}
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600 flex-shrink-0">
              My Pic
            </div>

            {/* Personal Details */}
            <div className="flex-grow grid grid-cols-2 gap-y-2 gap-x-4 text-gray-700">
              <p className="flex items-center space-x-2">
                {" "}
                <b className=""> Nakiboneka Mary Margret</b>{" "}
                <span className="text-dark cursor-pointer text-sm text-sub">
                  <CiEdit />
                </span>
              </p>
              <p className="flex items-center space-x-2">
                <span className="text-indigo-600 text-xl flex-shrink-0">
                  <MdEmail />
                </span>
                <span className=" font-semibold break-all">
                  nakibonekamarymargret@gmail.com
                </span>
                <sup>
                  <span className="text-indigo-500 cursor-pointer text-xl">
                    <CiEdit />
                  </span>
                </sup>
              </p>{" "}
              <p className="flex items-center space-x-2">
                <span className="text-dark text-xl flex-shrink-0">
                  <BsFillTelephoneOutboundFill />
                </span>
                <span className=" font-semibold break-all">
                  +256 786 122063
                </span>
                <sup>
                  <span className="text-indigo-500 cursor-pointer text-xl">
                    <CiEdit />
                  </span>
                </sup>
              </p>
              <p className="flex items-center space-x-2">
                <span>
                  <FaLocationDot />
                </span>
                Kampala, Uganda{" "}
                <sup>
                  <span className="text-indigo-500 cursor-pointer text-xl">
                    <CiEdit />
                  </span>
                </sup>
              </p>
              <p className="flex items-center space-x-2">
                <span>
                  {" "}
                  <FaGithub />
                </span>
                <a href="#" className="text-indigo-600 hover:underline">
                  https://github.com/nakibonekamarymargret
                </a>{" "}
                <sup>
                  <span className="text-indigo-500 cursor-pointer text-xl">
                    <CiEdit />
                  </span>
                </sup>
              </p>
              <p className="flex items-center space-x-2">
                <span>
                  <FaLinkedin />{" "}
                </span>
                <a
                  href="#"
                  className="text-dark hover:text-blue-500 hover:underline"
                >
                  /linkedin.com/in/nakiboneka-mary-9826aa225
                </a>{" "}
                <sup>
                  <span className="text-indigo-500 cursor-pointer text-xl">
                    <CiEdit />
                  </span>
                </sup>
              </p>
            </div>
          </div>
        </AdminSection>

        {/* Section 1: Recent Projects (Col 1) */}
        <AdminSection
          title="Recent Projects"
          formPath="/admin/projects/form"
          router={router}
        >
          <ProjectTable />
        </AdminSection>

        {/* Section 2: Experience (Col 2) */}
        <AdminSection
          title="Experience"
          formPath="/admin/experiences/form"
          router={router}
        >
          <ExperienceTable />
        </AdminSection>

        {/* Section 3: Technical Skills (Col 3) - New Section */}
        <AdminSection
          title="Technical Skills"
          formPath="/admin/skills/form"
          router={router}
        >
          <SkillsTable type="Technical" />
        </AdminSection>

        {/* Section 4: Soft Skills (Col 1) - New Section */}
        <AdminSection
          title="Soft Skills"
          formPath="/admin/softskills/form"
          router={router}
        >
          <SkillsTable type="Soft" />
        </AdminSection>

        {/* Section 5: Certifications (Col 2) */}
        <AdminSection
          title="Certifications"
          formPath="/admin/certifications/form"
          router={router}
        >
          <SkillsTable type="Certifications" />
        </AdminSection>

        {/* Section 6: What I'm Looking For (Col 3) */}
        <AdminSection
          title="What I'm Looking For"
          formPath="/admin/lookingfor/edit"
          router={router}
        >
          <div className="py-4 text-gray-700">
            <p>
              **Status:**{" "}
              <span className="font-semibold text-green-600">
                Open to opportunities
              </span>
            </p>
            <p>**Preferred Role:** Mid-Level Frontend Developer</p>
            <p className="text-sm italic text-gray-500 mt-2">
              This section describes your career goal for your visitors.
            </p>
          </div>
        </AdminSection>
      </div>
    </div>
  );
};

export default Admin;
