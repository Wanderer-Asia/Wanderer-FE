import Dashboard from "@/pages/Admin/Dashboard";
import AdminLayout from "@/components/Admin/AdminLayout";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages";
import Transaction from "@/pages/Admin/Transaction";

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
