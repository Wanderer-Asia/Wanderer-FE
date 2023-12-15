import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { Link } from "react-router-dom";
import Logo from "../Logo";
import React from "react";
import { Separator } from "../ui/separator";

const Navbar = () => {
  return (
    <div className="bg-tyellowlight flex flex-row justify-between px-5">
      <div className="flex flex-row items-center gap-14">
        <Logo width={80} height={80} />
        <Link to={"/"} className=" font-semibold">
          Home
        </Link>
      </div>
      <div className="flex flex-row items-center gap-8">
        <input
          type="text"
          className=" h-8 rounded-sm p-3"
          placeholder="Search Trip"
        />

        <Popover>
          <PopoverTrigger className=" mr-5">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src="https://s3-alpha-sig.figma.com/img/b4a6/4fb0/a04c59373f6a86de0bb2267a573adb75?Expires=1703462400&Signature=Oad1hCR-aUIrHDMc2jrXDMdspXf5iUH9RBTtCJqYXPYivPsNLiOBfHVaYK4AC0kBWs5gJbXIHysdrHtKVndeQWXAQAYbFmWm6K929jUJgUG3NzQ-~cklTytraojqfj1xyVk3oUfBmPqsNow5Rnzw1AZpd8a42PqKDtmK8GsZhS5QQicqtuRKSgNXEEHRMrGJLPSqTsZVNFA4BBU-TpivzijmJxWA~yH2MSESQ4W91viuFsmEYKtOJcvFJKxFKqOnF5Rg-lxI5TMPPMqDPc3irxOc9QHQAoEWIvBp0s7pANeBdRii1RvmK5PMzYMLVFqlSq44taxC37MDu3Aa8sM8lg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                alt="photo profile"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-3">
            <Link to={"/"} className=" font-semibold">
              Home
            </Link>
            <Link to={"/profile"} className=" font-semibold">
              Profile
            </Link>
            <Separator />
            <p className=" cursor-pointer font-semibold">Log out</p>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
