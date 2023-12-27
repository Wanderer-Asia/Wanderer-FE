import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Location, getLocation } from "@/utils/apis/location";
import { Swiper, SwiperSlide } from "swiper/react";
import { Trip, getTrip } from "@/utils/apis/trip";
import { useEffect, useState } from "react";

import DestinationCard from "@/components/user/destination-card";
import Layout from "@/components/user/layout";
import { Link } from "react-router-dom";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import TripCard from "@/components/user/trip-card";

const Home = () => {
  const [trip, setTrip] = useState<Trip[]>([]);
  const [locationData, setLocationData] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const tripResult = await getTrip("", 0, 3, "discount");
      setTrip(tripResult.data);

      const locationResult = await getLocation("", 5);
      setLocationData(locationResult.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
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
              {[1, 2].map((_item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={
                      "https://res.cloudinary.com/dypeyso0m/image/upload/v1703677326/homepage_d1cdw5.png"
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
                {trip &&
                  trip.map((item, index) => (
                    <TripCard data={item} key={index} />
                  ))}
              </div>
            </div>
          </div>
          <div className="mb-10 flex flex-col gap-8 px-10 pt-10">
            <div className="flex flex-row items-center gap-6">
              <Separator className="flex-1 bg-tyellow" />
              <label className="text-3xl font-semibold">Destination</label>
              <Separator className="flex-1 bg-tyellow" />
            </div>
            <div className="grid grid-cols-2 justify-items-center gap-4 md:grid-cols-3 lg:grid-cols-5">
              {locationData &&
                locationData.map((item, index) => (
                  <DestinationCard key={index} data={item} />
                ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Home;
