import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="h-screen">
      <div className="min-h-screen bg-[#f5f7fc] dark:bg-background">
        <Navbar />
        <div className="container">
          <div className="flex">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
