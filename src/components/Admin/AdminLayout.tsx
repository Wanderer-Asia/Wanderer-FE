import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminLayout = () => {
  return (
    <div className="h-screen">
      <div className="min-h-screen bg-[#f5f7fc] dark:bg-background">
        <Navbar />
        <div className="container h-screen">
          <div className="flex min-h-screen">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;