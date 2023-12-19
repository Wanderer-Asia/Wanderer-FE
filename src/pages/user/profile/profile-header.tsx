import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import EditProfile from "./edit-profile";

const ProfileHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-tblueLight p-20 text-black">
      <div className="flex flex-row">
        <Avatar className="h-40 w-40">
          <AvatarImage
            src="https://s3-alpha-sig.figma.com/img/b4a6/4fb0/a04c59373f6a86de0bb2267a573adb75?Expires=1703462400&Signature=Oad1hCR-aUIrHDMc2jrXDMdspXf5iUH9RBTtCJqYXPYivPsNLiOBfHVaYK4AC0kBWs5gJbXIHysdrHtKVndeQWXAQAYbFmWm6K929jUJgUG3NzQ-~cklTytraojqfj1xyVk3oUfBmPqsNow5Rnzw1AZpd8a42PqKDtmK8GsZhS5QQicqtuRKSgNXEEHRMrGJLPSqTsZVNFA4BBU-TpivzijmJxWA~yH2MSESQ4W91viuFsmEYKtOJcvFJKxFKqOnF5Rg-lxI5TMPPMqDPc3irxOc9QHQAoEWIvBp0s7pANeBdRii1RvmK5PMzYMLVFqlSq44taxC37MDu3Aa8sM8lg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="photo profile"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-16 flex flex-col">
          <div className=" text-3xl">Lee Donna</div>
          <p className=" text-xs">leedonaa@mail.com</p>
          <div className="mt-10 flex flex-row gap-10">
            <div className="flex flex-col text-center">
              <div className=" font-semibold">Review</div>
              <div>1</div>
            </div>
            <div className="flex flex-col text-center">
              <div className=" font-semibold">Trip</div>
              <div>2</div>
            </div>
          </div>
        </div>
      </div>
      <EditProfile />
    </div>
  );
};

export default ProfileHeader;
