import React from "react";
import Navbar from "../components/Navbar"; // optional, if you have a Navbar

interface Props {
  children: React.ReactNode;
}

const AdminLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Optional Admin Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
