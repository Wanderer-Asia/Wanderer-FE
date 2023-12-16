import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Layout from "@/components/user/layout";
import TripCard from "@/components/user/trip-card";

const Destionation = () => {
  return (
    <Layout>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="h-[32rem]"
        autoplay={{
          delay: 30000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img
            src={
              "https://s3-alpha-sig.figma.com/img/2187/d1a7/09ec5f3ca5d2243cf9ac9b8526d0c899?Expires=1703462400&Signature=Lw~Ro4zs2~i06kfXdbmXonNIba0qetdMH2O4PbNEt3EjFi-aDBhCBh~BSijViarsGLFM1GBrQPjadnmfwnpU9zS9h6jsJJ-6tni7QHWC0-DrGcN8GDP36JgHpic4NE~Z8qdK-B4cxkZCK4~px2Sl775ROgj0t5WY0mjOjG4lA51D4dwnNyl9yKDeneiWIKyls1xgbPIMnatgllnl5s~GPsm3IXjlydl8IK4EqpSNDT7929cPz-TZBWTtIc9Y02bNWuAazKlxPSaSmBWfKr0GPl5CnkpYGVEG7zgYlttvJbaS96LA1ILAoB3ZMKnxAen439QQdrVYT~gMy5UBh~BruA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            }
            alt="banner"
            className="h-full w-full object-fill"
          />
        </SwiperSlide>
      </Swiper>
      <div className="flex flex-col gap-8 px-10 pt-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-3xl font-semibold">Japan</label>
        </div>
        <div className="grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TripCard />
          <TripCard />
          <TripCard />
        </div>
      </div>
    </Layout>
  );
};

export default Destionation;
