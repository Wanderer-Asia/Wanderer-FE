import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/utils/context/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/utils/utils";
import Logo from "@/components/Logo";

const AuthLayout = () => {
  const { pathname } = useLocation();
  const { setTheme, theme } = useTheme();

  return (
    <div
      className={cn(
        "relative flex h-screen w-full",
        theme === "dark" ? "bg-background" : "bg-[#FFF6EE]",
        "transition-all duration-500 ease-in-out",
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="absolute right-5 top-5 h-8 w-8">
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-100 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            <span className="flex w-full justify-between">
              Light <Sun className="h-5 w-5" />
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            <span className="flex w-full justify-between">
              Dark
              <Moon className="h-5 w-5" />
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex h-full w-full flex-1 items-center justify-center">
        <Logo width={500} height={500} />
      </div>
      <div className="flex h-full w-full flex-1 justify-center">
        <Tabs defaultValue={`${pathname}`} className="mt-[180px] w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="/login">Login</TabsTrigger>
            <TabsTrigger value="/register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="/login">
            <LoginForm />
          </TabsContent>
          <TabsContent value="/register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthLayout;
