import AddTour from "@/pages/Admin/Tours/Modules/AddTour";
import AdminLayout from "@/components/Admin/AdminLayout";
import AuthLayout from "@/pages/Auth/AuthLayout";
import BestDeals from "@/pages/user/best-deals";
import Booking from "@/pages/user/booking";
import Dashboard from "@/pages/Admin";
import Destionation from "@/pages/user/destination";
import DetailTrip from "@/pages/user/detail-trip";
import HomePage from "@/pages/user/home";
import OrderSuccess from "@/pages/user/order-success";
import Payment from "@/pages/user/payment";
import ProfilePage from "@/pages/user/profile";
import ToursPage from "@/pages/Admin/Tours/ToursPage";
import TransactionsPage from "@/pages/Admin/Transactions";
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
    path: "/detail-trip/:tripId",
    element: <DetailTrip />,
  },
  {
    path: "/booking/:tripId",
    element: <Booking />,
  },
  {
    path: "/payment/:tripId",
    element: <Payment />,
  },
  {
    path: "/order-success",
    element: <OrderSuccess />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
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
        children: [
          {
            index: true,
            element: <ToursPage />,
          },
          {
            path: "add-tour",
            element: <AddTour />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
  },
  {
    path: "/register",
    element: <AuthLayout />,
  },
]);
