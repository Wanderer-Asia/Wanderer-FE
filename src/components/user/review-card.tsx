import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Review } from "@/utils/apis/trip";
import { format } from "date-fns";

interface Props {
  data: Review;
}
const ReviewCard = (props: Props) => {
  const { data } = props;
  return (
    <div className="flex flex-row gap-5">
      <Avatar className="h-14 w-14">
        <AvatarImage
          src={data.user.image}
          alt="photo profile"
          className=" object-cover"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="mt-2 flex flex-col">
        <label className=" font-semibold">{data.user.fullname}</label>
        <p className=" text-xs">
          {format(new Date(data.created_at), "d MMM yyyy")}
        </p>
        <p className=" mt-2 text-justify">{data.text}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
