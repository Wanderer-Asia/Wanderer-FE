import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChangeEvent, ReactHTMLElement, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Trip, getTrip } from "@/utils/apis/trip";

import { Button } from "../ui/button";
import Logo from "../Logo";
import { Separator } from "../ui/separator";
import { useTheme } from "@/utils/context/theme-provider";
import { useToast } from "../ui/use-toast";
import { useToken } from "@/utils/context/token";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { changeToken, token, user } = useToken();
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Trip[]>([]);

  const handleSearch = async (query: string) => {
    try {
      const result = await getTrip(query, 0, 0, "");

      setSearchResults(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const handleLogout = () => {
    changeToken();
    toast({
      description: "Logout Successfully",
    });
  };
  return (
    <div className="flex flex-row justify-between bg-tyellowlight px-5">
      <div className="flex flex-row items-center gap-14">
        <Logo width={80} height={80} />
        <Link to={"/"} className=" hidden font-semibold text-black md:flex">
          Home
        </Link>
      </div>
      <div className="flex flex-row items-center gap-8">
        <div className="relative">
          <input
            type="text"
            className=" h-8 rounded-sm p-3 text-gray-800 outline-tyellow"
            placeholder="Search Trip"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchQuery && searchResults.length > 0 && (
            <ul className="absolute left-0 right-0 top-10 z-10 mr-4 rounded-md border-2 border-solid border-gray-100 bg-white outline-none dark:border-gray-800 dark:bg-gray-900">
              {searchResults &&
                searchResults.map((item, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      navigate(`/detail-trip/${item.tour_id}`);
                    }}
                  >
                    {item.title}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="h-8 w-8">
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

        <Popover>
          <PopoverTrigger className=" mr-5">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={user.image}
                alt="photo profile"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-3">
            <Link to={"/"} className=" font-semibold">
              Home
            </Link>
            {token ? (
              <>
                <Link to={"/profile"} className=" font-semibold">
                  Profile
                </Link>
                <Separator />
                <p
                  onClick={handleLogout}
                  className=" cursor-pointer font-semibold"
                >
                  Log out
                </p>
              </>
            ) : (
              <>
                <Separator />
                <Link to={"/login"} className=" font-semibold">
                  Login
                </Link>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
