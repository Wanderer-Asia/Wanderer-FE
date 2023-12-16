import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { Banknote, LayoutDashboard } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="mr-8 min-h-full w-[270px] min-w-[270px] bg-background dark:border">
      <div className="flex w-full justify-center">
        <Logo width={200} height={200} />
      </div>

      <div className="mt-5 flex flex-col p-3">
        <NavLink
          to={"/admin"}
          className={({ isActive }) =>
            isActive
              ? "flex w-full items-center gap-4 rounded-lg bg-yellow-main py-4 pl-3"
              : "flex w-full items-center gap-4 rounded-lg bg-transparent py-4 pl-3"
          }
          end
        >
          {({ isActive }) => (
            <>
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg border p-1 ${
                  isActive
                    ? "border-[#0F5FC2]"
                    : "border-black dark:border-white"
                }`}
              >
                <LayoutDashboard
                  className={`h-full w-full ${
                    isActive
                      ? "stroke-[#0F5FC2]"
                      : "stroke-black dark:stroke-white"
                  }`}
                />
              </div>
              <p
                className={`${
                  isActive ? "font-bold text-[#0F5FC2]" : "font-normal"
                }`}
              >
                Dashboard
              </p>
            </>
          )}
        </NavLink>

        <NavLink
          to={"transactions"}
          className={({ isActive }) =>
            isActive
              ? "flex w-full items-center gap-4 rounded-lg bg-yellow-main py-4 pl-3"
              : "flex w-full items-center gap-4 rounded-lg bg-transparent py-4 pl-3"
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg border p-1 ${
                  isActive
                    ? "border-[#0F5FC2]"
                    : "border-black dark:border-white"
                }`}
              >
                <Banknote
                  className={`h-full w-full ${
                    isActive
                      ? "stroke-[#0F5FC2]"
                      : "stroke-black dark:stroke-white"
                  }`}
                />
              </div>
              <p
                className={`${
                  isActive ? "font-bold text-[#0F5FC2]" : "font-normal"
                }`}
              >
                Transactions
              </p>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
