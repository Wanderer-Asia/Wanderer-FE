import { Outlet } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="relative min-h-screen w-full">
      <div className="min-h-screen bg-[#f5f7fc] dark:bg-background">
        <Navbar />
        <div className="container">
          <div className="flex h-full">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AdminLayout;
