import Loading from "@/components/Loading";
import { useToken } from "@/utils/context/token";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();

  const authProtected = ["/login", "/register"];

  const { token, user } = useToken();

  if (authProtected.includes(pathname)) {
    if (token) {
      return <Navigate to={"/"} />;
    }
  }

  if (user === null) {
    return <Loading />;
  } else {
    if (pathname.includes("/admin")) {
      if (user.role !== "admin") {
        return <Navigate to={"/"} />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
