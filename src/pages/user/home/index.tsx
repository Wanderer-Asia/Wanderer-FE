import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Trip, getTrip } from "@/utils/apis/trip";
import { useEffect, useState } from "react";

import DestinationCard from "@/components/user/destination-card";
import Layout from "@/components/user/layout";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import TripCard from "@/components/user/trip-card";

const Home = () => {
  const [trip, setTrip] = useState<Trip[]>([]);

  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      const result = await getTrip("", 0, 3, "discount");
      console.log(result);

      setTrip(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="overflow-auto">
        <div className="h-[25rem] w-full">
          <Swiper
            spaceBetween={30}
            effect={"fade"}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            autoplay={{
              delay: 30000,
              disableOnInteraction: false,
            }}
          >
            {[1, 2].map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={
                    "https://s3-alpha-sig.figma.com/img/632b/1f72/bc2e905f3f59e57cfd99f7de8a7024fe?Expires=1704067200&Signature=R4XMQMYvIXNXgu~uDQkN4c01pugfgoCKdvDjFGcXsDub6QJ1MHKNo3iK~UOSH8ym1NKmY9w96HR8B636L2Ldx7GSj5iEvaJLnPWhIGnF6DNV-vcCISvxZZXQv5fRx2YgKepoDvSu3bGgHRakcGZrV9Ckz-K-SLdRJAeYo5UQb7RZwatZ86F~S9c1o4tS4uUlHCC1kSP431SE5a6ogYvRkGx5LcGwPe6Z6u-bG0rQ3sqzciy8Pm-Io5OPKT7bcjYkgzdO7xSMmtUtxQnV~6oOMQfKTdc5St4t9lIhMrq1AhsO2iGg~FTyhE2ufeE1AkI8h7tP7IUrekJHKTJH7Ua7Fg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  }
                  alt="banner"
                  className="h-full w-full object-fill"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col px-10 pt-10">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <label className="text-3xl font-semibold">Best Deals</label>
              <Link to="/best-deals">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="18"
                  viewBox="0 0 25 18"
                  fill="none"
                  className="fill-black dark:fill-white"
                >
                  <path d="M12.5 17.1875L25 4.6875L20.3125 -1.90735e-06L12.5 7.8125L4.6875 -1.90735e-06L0 4.6875L12.5 17.1875Z" />
                </svg>
              </Link>
            </div>
            <div className="grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
              {trip.map((item, index) => (
                <TripCard data={item} key={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 px-10 pt-10">
          <div className="flex flex-row items-center gap-6">
            <Separator className="flex-1 bg-tyellow" />
            <label className="text-3xl font-semibold">Destination</label>
            <Separator className="flex-1 bg-tyellow" />
          </div>
          <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-5">
            <DestinationCard />
            <DestinationCard />
            <DestinationCard />
            <DestinationCard />
            <DestinationCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
