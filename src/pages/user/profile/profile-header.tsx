import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import EditProfile from "./edit-profile";
import { useToken } from "@/utils/context/token";

const ProfileHeader = () => {
  const { user } = useToken();
  return (
    <div className="flex flex-col justify-between bg-tblueLight p-20 text-black md:flex-row md:items-center">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <Avatar className="h-28 w-28 md:h-40 md:w-40">
            <AvatarImage
              src={user.image}
              alt="photo profile"
              className="object-cover"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="ml-16 flex flex-col">
          <div className="hidden text-3xl md:flex">{user.fullname}</div>
          <p className="hidden text-xs md:flex">{user.email}</p>
          <div className="mt-10 flex flex-row gap-10">
            <div className="flex flex-col text-center">
              <div className="font-semibold">Review</div>
              <div>{user.review_count}</div>
            </div>
            <div className="flex flex-col text-center">
              <div className=" font-semibold">Trip</div>
              <div>{user.tour_count}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex flex-row justify-between md:hidden">
        <div className="flex flex-col">
          <div className="text-2xl">{user.fullname}</div>
          <p className="text-xs">{user.email}</p>
        </div>
        <EditProfile />
      </div>

      <div className="hidden md:flex">
        <EditProfile />
      </div>
    </div>
  );
};

export default ProfileHeader;
