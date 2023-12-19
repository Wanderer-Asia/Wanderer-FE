import { ITours } from "@/utils/apis/tour";
import { Banknote, MapPin, Star, UsersIcon } from "lucide-react";

interface IProps {
  tourData: ITours;
}

const TourCard = (props: IProps) => {
  const { tourData } = props;

  return (
    <div className="w-fit rounded-lg bg-background p-5 shadow-lg dark:border">
      <div className="relative rounded-lg">
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/10 px-[4px] py-[2px] text-base font-medium backdrop-blur-sm">
          <MapPin className="h-[14px] w-[14px] fill-green-500 stroke-white" />
          <p className="text-[12px] text-white">{tourData.location?.name}</p>
        </div>
        <img src={tourData.thumbnail} alt="japan" className="rounded-lg aspect-[1/1] object-cover" />
      </div>
      <div className="mt-2 px-2">
        <p className="text-left text-[14px] font-medium">{tourData.title}</p>
        <div className="mt-3">
          <span className="mt-1 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 fill-red-400" />
            <p className="text-[14px]">{tourData.quota} Persons</p>
          </span>
          <span className="mt-1 flex items-center gap-3">
            <Star className="h-5 w-5 fill-yellow-400" />
            <p className="text-[14px]">{tourData.rating}/5</p>
          </span>
          <span className="mt-1 flex items-center gap-3">
            <Banknote className="h-5 w-5 fill-green-300" />
            <p className="text-[14px]">
              Rp. {tourData.price?.toLocaleString("id-ID")}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
