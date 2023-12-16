import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import { Button } from "../ui/button";
import { useState } from "react";

const ReviewDialog = () => {
  const [selectedStars, setSelectedStars] = useState(0); // State to track selected stars
  console.log(selectedStars);

  // Function to handle star selection
  const handleStarSelection = (starCount: number) => {
    setSelectedStars(starCount); // Update the selected star count
  };
  return (
    <Dialog>
      <DialogTrigger>
        <input
          placeholder="Tulis Pesan"
          className=" bg-tblueLight w-full rounded-sm p-3 outline-none placeholder:text-gray-800"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className=" items-center">
          <DialogTitle>Jepang Winter Golden Route & Mount Fuji</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3">
          <div className="mt-5 flex flex-row gap-5">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src="https://s3-alpha-sig.figma.com/img/b4a6/4fb0/a04c59373f6a86de0bb2267a573adb75?Expires=1703462400&Signature=Oad1hCR-aUIrHDMc2jrXDMdspXf5iUH9RBTtCJqYXPYivPsNLiOBfHVaYK4AC0kBWs5gJbXIHysdrHtKVndeQWXAQAYbFmWm6K929jUJgUG3NzQ-~cklTytraojqfj1xyVk3oUfBmPqsNow5Rnzw1AZpd8a42PqKDtmK8GsZhS5QQicqtuRKSgNXEEHRMrGJLPSqTsZVNFA4BBU-TpivzijmJxWA~yH2MSESQ4W91viuFsmEYKtOJcvFJKxFKqOnF5Rg-lxI5TMPPMqDPc3irxOc9QHQAoEWIvBp0s7pANeBdRii1RvmK5PMzYMLVFqlSq44taxC37MDu3Aa8sM8lg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                alt="photo profile"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="mt-2 flex flex-col">
              <label className=" font-semibold">Jhon</label>
              <p className=" text-xs">
                Posting for the public, your comment can be seen by others.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                width="78"
                height="78"
                viewBox="0 0 78 78"
                fill="none"
                onClick={() => handleStarSelection(star)}
                className="cursor-pointer"
              >
                <path
                  d="M8.50195 32.136L23.79 47.034L20.202 68.016L39 58.11L57.798 68.016L54.21 47.034L69.4979 32.136L48.438 29.094L39 10.062L29.562 29.094L8.50195 32.136Z"
                  fill={star <= selectedStars ? "#FFB703" : "gray"}
                />
              </svg>
            ))}
          </div>
          <textarea
            placeholder="Tulis Pesan"
            className=" bg-tblueLight mt-5 w-full rounded-sm p-3 outline-none placeholder:text-gray-800"
          />
        </div>
        <DialogFooter className="mt-10 sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="secondary"
            className=" bg-tyellow hover:bg-tyellowlight"
          >
            Posting
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
