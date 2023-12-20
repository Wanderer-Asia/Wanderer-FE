import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import EditProfile from "./edit-profile";
import { useToken } from "@/utils/context/token";

const ProfileHeader = () => {
  const { user } = useToken();
  return (
    <div className="flex flex-row items-center justify-between bg-tblueLight p-20 text-black">
      <div className="flex flex-row">
        <Avatar className="h-40 w-40">
          <AvatarImage src={user.image} alt="photo profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-16 flex flex-col">
          <div className=" text-3xl">{user.fullname}</div>
          <p className=" text-xs">{user.email}</p>
          <div className="mt-10 flex flex-row gap-10">
            <div className="flex flex-col text-center">
              <div className=" font-semibold">Review</div>
              <div>{user.tour_count}</div>
            </div>
            <div className="flex flex-col text-center">
              <div className=" font-semibold">Trip</div>
              <div>{user.tour_count}</div>
            </div>
          </div>
        </div>
      </div>
      <EditProfile />
    </div>
  );
};

export default ProfileHeader;
