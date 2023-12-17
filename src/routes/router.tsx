import AdminLayout from "@/components/Admin/AdminLayout";
import BestDeals from "@/pages/user/best-deals";
import Booking from "@/pages/user/booking";
import Dashboard from "@/pages/Admin/Dashboard";
import Destionation from "@/pages/user/destination";
import DetailTrip from "@/pages/user/detail-trip";
import HomePage from "@/pages/user/home";
import { createBrowserRouter } from "react-router-dom";
import TransactionsPage from "@/pages/Admin/Transactions/TransactionsPage";
import ToursPage from "@/pages/Admin/Tours/ToursPage";

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
    path: "/detail-trip/:tripId",
    element: <DetailTrip />,
  },
  {
    path: "/booking/:tripId",
    element: <Booking />,
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
        element: <TransactionsPage />,
      },
      {
        path: "tours",
        element: <ToursPage />,
      },
    ],
  },
]);
