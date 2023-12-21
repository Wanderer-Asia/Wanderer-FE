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
import ToursPage from "@/pages/Admin/Tours";
import TransactionsPage from "@/pages/Admin/Transactions";
import { createBrowserRouter } from "react-router-dom";
import SettingsPage from "@/pages/Admin/Settings";
import AirlinesPage from "@/pages/Admin/Airlines";
import LocationsPage from "@/pages/Admin/Locations";
import FacilitiesPage from "@/pages/Admin/Facilities";
import EditTour from "@/pages/Admin/Tours/Modules/EditTour";

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
    path: "/destination/:locationId",
    element: <Destionation />,
  },
  {
    path: "/detail-trip/:tripId/:bookingId?",
    element: <DetailTrip />,
  },
  {
    path: "/booking/:tripId/:bookingId?",
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
          {
            path: "edit-tour/:id",
            element: <EditTour />,
          },
        ],
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "airlines",
        element: <AirlinesPage />,
      },
      {
        path: "locations",
        element: <LocationsPage />,
      },
      {
        path: "facilities",
        element: <FacilitiesPage />,
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
