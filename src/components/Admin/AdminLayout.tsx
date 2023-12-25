import { Outlet } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="min-h-screen bg-[#f5f7fc] dark:bg-background">
        <Navbar />
        <div className="container">
          <div className="flex min-h-screen">
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
