import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useEffect, useState } from "react";

import Layout from "@/components/user/layout";
import Loading from "@/components/Loading";
import { LocationDetail } from "@/utils/apis/location";
import TripCard from "@/components/user/trip-card";
import { getDetailLocation } from "@/utils/apis/location/api";
import { useParams } from "react-router-dom";

const Destionation = () => {
  const { locationId } = useParams();
  const [locationData, setLocationData] = useState<LocationDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      setIsLoading(true);
      const result = await getDetailLocation(locationId as string);

      setLocationData(result.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <img
            src={
              "https://s3-alpha-sig.figma.com/img/2187/d1a7/09ec5f3ca5d2243cf9ac9b8526d0c899?Expires=1703462400&Signature=Lw~Ro4zs2~i06kfXdbmXonNIba0qetdMH2O4PbNEt3EjFi-aDBhCBh~BSijViarsGLFM1GBrQPjadnmfwnpU9zS9h6jsJJ-6tni7QHWC0-DrGcN8GDP36JgHpic4NE~Z8qdK-B4cxkZCK4~px2Sl775ROgj0t5WY0mjOjG4lA51D4dwnNyl9yKDeneiWIKyls1xgbPIMnatgllnl5s~GPsm3IXjlydl8IK4EqpSNDT7929cPz-TZBWTtIc9Y02bNWuAazKlxPSaSmBWfKr0GPl5CnkpYGVEG7zgYlttvJbaS96LA1ILAoB3ZMKnxAen439QQdrVYT~gMy5UBh~BruA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            }
            alt="banner"
            className="h-[25rem] w-full object-fill"
          />
          <div className="flex flex-col gap-8 px-10 pb-7 pt-10">
            <div className="flex flex-col items-center justify-center gap-6">
              <label className="text-3xl font-semibold">
                {locationData?.name}
              </label>
            </div>
            <div className="grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
              {locationData?.tours &&
                locationData?.tours.map((item, index) => (
                  <TripCard data={item} key={index} />
                ))}
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Destionation;
