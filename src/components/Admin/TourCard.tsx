import { Banknote, MapPin, Star, UsersIcon } from "lucide-react";

const TourCard = () => {
  const image =
    "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="w-fit rounded-lg bg-background p-5 shadow-lg dark:border">
      <div className="relative aspect-[16/9] w-[300px] rounded-lg">
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-white/10 px-[4px] py-[2px] text-base font-medium backdrop-blur-sm">
          <MapPin className="h-[14px] w-[14px] stroke-white fill-green-500" />
          <p className="text-[12px] text-white">Japan</p>
        </div>
        <img src={image} alt="japan" className="rounded-lg" />
      </div>
      <div className="mt-2 px-2">
        <p className="text-left text-[14px] font-medium">
          Jepang Winter Golden Route & Mount Fuji
        </p>
        <div className="mt-3">
          <span className="mt-1 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 fill-red-400" />
            <p className="text-[14px]">10 Persons</p>
          </span>
          <span className="mt-1 flex items-center gap-3">
            <Star className="h-5 w-5 fill-yellow-400" />
            <p className="text-[14px]">4.8/5</p>
          </span>
          <span className="mt-1 flex items-center gap-3">
            <Banknote className="h-5 w-5 fill-green-300" />
            <p className="text-[14px]">Rp. 24 JT</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
