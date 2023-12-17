import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { Banknote, LayoutDashboard, LucideIcon } from "lucide-react";

type LinkListType = {
  title: string;
  to: string;
  end: boolean | undefined;
  icon: LucideIcon;
}[];

const LinkList: LinkListType = [
  {
    title: "Dashboard",
    to: "/admin",
    end: true,
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    to: "transactions",
    end: false,
    icon: Banknote,
  },
];

const Sidebar = () => {
  return (
    <div className="sticky top-[60px] mr-8 hidden h-[calc(100vh-60px)] w-[270px] min-w-[270px] bg-background dark:border xl:block">
      <div className="flex w-full justify-center">
        <Logo width={200} height={200} />
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
    </div>
  );
};

export default Sidebar;
