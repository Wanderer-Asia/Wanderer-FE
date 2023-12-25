import {
  Banknote,
  MapPin,
  MoreHorizontal,
  Star,
  UsersIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";

interface IProps {
  tourData: {
    tour_id: number;
    title: string;
    quota: number;
    discount: number;
    rating: number;
    price: number;
    thumbnail: string;
    start: string;
    location: {
      name: string;
    };
  };
}

const TourCard = (props: IProps) => {
  const { tourData } = props;
  const navigate = useNavigate();

  return (
    <div className="w-fit rounded-lg bg-background px-5 pb-5 shadow-lg dark:border">
      <div className="flex w-full justify-end p-1">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal className="h-full" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to={`/admin/tours/edit-tour/${tourData.tour_id}`}>
              <DropdownMenuItem>Edit Tour</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="relative rounded-lg">
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/10 px-[4px] py-[2px] text-base font-medium backdrop-blur-sm">
          <MapPin className="h-[14px] w-[14px] fill-green-500 stroke-white" />
          <p className="text-[12px] text-white">{tourData.location?.name}</p>
        </div>
        {tourData.thumbnail ? (
          <img
            src={tourData.thumbnail}
            alt="japan"
            className="aspect-[1/1] rounded-lg object-cover"
          />
        ) : (
          <Skeleton className="aspect-[1/1] rounded-lg object-cover" />
        )}
      </div>
      <div className="mt-2 px-2">
        <p
          className="text-left text-[14px] font-medium hover:cursor-pointer hover:underline"
          onClick={() =>
            navigate(`/admin/tours/detail-tour/${tourData.tour_id}`)
          }
        >
          {tourData.title}
        </p>
        <div className="mt-3">
          <span className="mt-1 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 fill-red-400" />
            <p className="text-[11px] md:text-[14px]">
              {tourData.quota} Persons
            </p>
          </span>
          <span className="mt-1 flex items-center gap-3">
            <Star className="h-5 w-5 fill-yellow-400" />
            <p className="text-[11px] md:text-[14px]">{tourData.rating}/5</p>
          </span>
          <span className="mt-1 flex items-center gap-3">
            <Banknote className="h-5 w-5 fill-green-300" />
            <p className="text-[11px] md:text-[14px]">
              Rp. {tourData.price?.toLocaleString("id-ID")}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
