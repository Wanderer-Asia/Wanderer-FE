import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [avatarImage, setAvatarImage] = useState<string>(
    "https://s3-alpha-sig.figma.com/img/b4a6/4fb0/a04c59373f6a86de0bb2267a573adb75?Expires=1703462400&Signature=Oad1hCR-aUIrHDMc2jrXDMdspXf5iUH9RBTtCJqYXPYivPsNLiOBfHVaYK4AC0kBWs5gJbXIHysdrHtKVndeQWXAQAYbFmWm6K929jUJgUG3NzQ-~cklTytraojqfj1xyVk3oUfBmPqsNow5Rnzw1AZpd8a42PqKDtmK8GsZhS5QQicqtuRKSgNXEEHRMrGJLPSqTsZVNFA4BBU-TpivzijmJxWA~yH2MSESQ4W91viuFsmEYKtOJcvFJKxFKqOnF5Rg-lxI5TMPPMqDPc3irxOc9QHQAoEWIvBp0s7pANeBdRii1RvmK5PMzYMLVFqlSq44taxC37MDu3Aa8sM8lg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  );

  const navigate = useNavigate();

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarImage(result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          variant="secondary"
          className=" bg-tyellow px-5 hover:bg-tyellowlight"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className=" items-center">
          <label htmlFor="avatarUpload" className="cursor-pointer">
            <Avatar className="h-40 w-40">
              <AvatarImage src={avatarImage} alt="photo profile" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </label>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </DialogHeader>
        <div className="flex flex-col items-center gap-3 px-14">
          <input
            placeholder="Full Name"
            className=" w-full rounded-sm bg-tblueLight p-3 outline-none placeholder:text-gray-800"
          />
          <input
            placeholder="Email"
            type="email"
            className=" w-full rounded-sm bg-tblueLight p-3 outline-none placeholder:text-gray-800"
          />
          <input
            placeholder="Password"
            type="password"
            className=" w-full rounded-sm bg-tblueLight p-3 outline-none placeholder:text-gray-800"
          />
          <input
            placeholder="Retype Password"
            type="password"
            className=" w-full rounded-sm bg-tblueLight p-3 outline-none placeholder:text-gray-800"
          />
        </div>
        <DialogFooter className="mt-10 sm:justify-center">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="secondary"
            className=" bg-tyellow hover:bg-tyellowlight"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
