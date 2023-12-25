import Loading from "@/components/Loading";
import { useToast } from "@/components/ui/use-toast";
import { ITours, getTourDetail } from "@/utils/apis/tour";
import { format } from "date-fns";
import { Clock, Plane, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DetailTour = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const [tourData, setTourData] = useState<ITours>();

  const fetchData = useCallback(async () => {
    try {
      const res = await getTourDetail(id);

      setTourData(res?.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: <p className="capitalize">{error.message}</p>,
        });
      }
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);

  console.log(tourData);

  return (
    <>
      {tourData ? (
        <div className="w-full">
          <p className="mt-3 text-[32px] font-bold capitalize">
            {tourData.title}
          </p>
          <div className="mt-2 flex justify-between border-b-4 border-tyellow pb-3">
            <div className="flex gap-8">
              <span className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 fill-tyellow stroke-tyellow" />
                <p className="font-semibold">{tourData.rating} / 5</p>
              </span>
              <span className="flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                <p className="flex items-center justify-center text-center font-semibold">
                  {format(new Date(tourData.start), "PPP")}
                </p>
              </span>
            </div>
            <div className="flex gap-2">
              <Plane />{" "}
              <p className="font-semibold capitalize">
                {tourData.airline.name}
              </p>
            </div>
          </div>

          <div className="flex w-full justify-center mt-5">
            <div className="h-[500px] w-[1100px]">
              <Swiper
                slidesPerView={1}
                pagination={{
                  clickable: true,
                }}
                effect={"fade"}
                navigation={true}
                modules={[Navigation, Pagination, Autoplay]}
                autoplay={{
                  delay: 30000,
                  disableOnInteraction: false,
                }}
              >
                {tourData.picture.map((pic, index) => (
                  <SwiperSlide>
                    <img
                      src={pic}
                      alt={`${pic}${index}`}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DetailTour;
