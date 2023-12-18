import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";

import Logo from "@/assets/Wanderer.svg";
import { LinkList } from "./Sidebar";
import { NavLink } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const SidebarMobile = (props: IProps) => {
  const { children } = props;

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent side="left" className="w-[325px]">
        <div className="w-full flex items-center justify-center">
          <img src={Logo} alt="logo" className="w-[200px]" />
        </div>

        <div className="mt-5 flex flex-col p-3">
        {LinkList.map((link) => (
          <NavLink
            key={link.title}
            to={link.to}
            className={({ isActive }) =>
              isActive
                ? "flex w-full items-center gap-4 rounded-lg bg-yellow-main py-4 pl-3"
                : "flex w-full items-center gap-4 rounded-lg bg-transparent py-4 pl-3"
            }
            end={link.end}
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
                  <link.icon
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
                  {link.title}
                </p>
              </>
            )}
          </NavLink>
        ))}
      </div>
      </SheetContent>
    </Sheet>
  );
};

export default SidebarMobile;
