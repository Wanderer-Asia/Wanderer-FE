import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import DestinationCard from "@/components/user/destination-card";
import Layout from "@/components/user/layout";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import TripCard from "@/components/user/trip-card";

const Home = () => {
  return (
    <Layout>
      <div className="overflow-auto">
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          className="h-[25rem]"
          autoplay={{
            delay: 30000,
            disableOnInteraction: false,
          }}
        >
          {[1, 2].map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={
                  "https://s3-alpha-sig.figma.com/img/768b/47ba/e78f40c2746f08f60008a758a2830ba5?Expires=1703462400&Signature=TH2zJsFIwt-lwG~~sJn~fjc4sUx78KZEivoKbpMuhLSFxTu42n23oy-HAI7Wvbby3gx4FuF72~TIWpTbq0RTyC7TC5JkRxI5ZtbpAQ4Iv0H42rU~6KC7RdskoSXB0TDqGHco9MZjVaBjd2nwGNT0-83ze~eWjduS0zqZEDHHnnqnk198fZMiCeXHmCmlA5Ylw7-kFRPPBvW9mPUA0N~i3e9dgB75jglLUrLAfwO0zNE5FJjt7~tyevfzVf~XOtfQEG-RtQ3Zv3JmLJHnDNDdwonX6X~wHFEPBxCxhe8GSbr3HOsn656-I6JIwD25CJyCOd~f1MoHO1M6OV6lZtcZ6Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                }
                alt="banner"
                className="h-full w-full object-fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
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
              <TripCard />
              <TripCard />
              <TripCard />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 px-10 pt-10">
          <div className="flex flex-row items-center gap-6">
            <Separator className="bg-tyellow flex-1" />
            <label className="text-3xl font-semibold">Destination</label>
            <Separator className="bg-tyellow flex-1" />
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
