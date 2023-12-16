import AdminLayout from "@/components/Admin/Layout";
import BestDeals from "@/pages/user/best-deals";
import Dashboard from "@/pages/Admin/Dashboard";
import Destionation from "@/pages/user/destination";
import HomePage from "@/pages/user/home";
import Transaction from "@/pages/Admin/Transaction";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/best-deals",
    element: <BestDeals />,
  },
  {
    path: "/destination/:destination",
    element: <Destionation />,
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
