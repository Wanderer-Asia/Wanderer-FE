import AdminLayout from "@/components/Admin/Layout";
import Dashboard from "@/pages/Admin/Dashboard";
import HomePage from "@/pages/home";
import Transaction from "@/pages/Admin/Transaction";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transaction />,
      },
    ],
  },
]);
