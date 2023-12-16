import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewCard = () => {
  return (
    <div className="flex flex-row gap-5">
      <Avatar className="h-14 w-14">
        <AvatarImage
          src="https://s3-alpha-sig.figma.com/img/b4a6/4fb0/a04c59373f6a86de0bb2267a573adb75?Expires=1703462400&Signature=Oad1hCR-aUIrHDMc2jrXDMdspXf5iUH9RBTtCJqYXPYivPsNLiOBfHVaYK4AC0kBWs5gJbXIHysdrHtKVndeQWXAQAYbFmWm6K929jUJgUG3NzQ-~cklTytraojqfj1xyVk3oUfBmPqsNow5Rnzw1AZpd8a42PqKDtmK8GsZhS5QQicqtuRKSgNXEEHRMrGJLPSqTsZVNFA4BBU-TpivzijmJxWA~yH2MSESQ4W91viuFsmEYKtOJcvFJKxFKqOnF5Rg-lxI5TMPPMqDPc3irxOc9QHQAoEWIvBp0s7pANeBdRii1RvmK5PMzYMLVFqlSq44taxC37MDu3Aa8sM8lg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          alt="photo profile"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="mt-2 flex flex-col">
        <label className=" font-semibold">Jhon</label>
        <p className=" text-xs">14 Dec 23</p>
        <p className=" mt-2 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
