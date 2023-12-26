import Loading from "@/components/Loading";
import { useToast } from "@/components/ui/use-toast";
import { ITours, getTourDetail } from "@/utils/apis/tour";
import { eachDayOfInterval, format } from "date-fns";
import {
  Banknote,
  CalendarDays,
  Check,
  Clock,
  MapPinned,
  Plane,
  Star,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DetailTour = () => {
  const { toast } = useToast();
  const { id } = useParams();

  const [tourData, setTourData] = useState<ITours>();
  const [intervalDate, setIntervalDate] = useState<Date[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const res = await getTourDetail(id);

      setTourData(res?.data);
      setIntervalDate(
        eachDayOfInterval({
          start: new Date(res!.data.start),
          end: new Date(res!.data.finish),
        }),
      );
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
    document.title = tourData ? tourData.title : "Wanderer";
  }, [fetchData]);

  return (
    <>
      {tourData ? (
        <div className="w-full">
          <p className="mt-3 text-[24px] font-bold capitalize md:text-[32px]">
            {tourData.title}
          </p>
          <div className="mt-2 flex justify-between border-b-4 border-tyellow pb-3">
            <div className="flex gap-8">
              <span className="flex items-center justify-center gap-2">
                <Star className="h-5 w-5 fill-tyellow stroke-tyellow" />
                <p className="text-[14px] font-medium">{tourData.rating}/5</p>
              </span>
              <span className="flex items-center justify-center gap-2">
                <Clock className="h-5 w-5" />
                <p className="text-[14px] font-medium">
                  {format(new Date(tourData.start), "PPP")}
                </p>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5" />{" "}
              <p className="text-[14px] font-medium capitalize">
                {tourData.airline.name}
              </p>
            </div>
          </div>

          <div className="mt-5 flex w-full justify-center">
            <div className="h-[500px] w-[400px] md:w-[700px] lg:w-[1000px] xl:w-[1130px]">
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
                  <SwiperSlide key={index}>
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

          <div className="mt-5 rounded-lg bg-background p-5">
            <p className="text-[24px] font-semibold">Description</p>
            <p className="mt-3 text-justify  dark:text-slate-400">
              {tourData.description}
            </p>
            <div className="mt-5 flex items-center gap-4 font-medium">
              <Banknote />
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(tourData.price)}
            </div>
            <div className="mt-2 flex items-center gap-4 font-medium">
              <CalendarDays />
              {`${format(new Date(tourData.start), "dd MMM")} - ${format(
                new Date(tourData.finish),
                "dd MMM yyyy",
              )}`}
            </div>
            <div className="mt-2 flex items-center gap-4 font-medium">
              <MapPinned />
              {`${tourData.location.name}`}
            </div>
          </div>

          <div className="my-5 flex flex-col gap-5 rounded-lg bg-background p-5 shadow-lg md:flex-row">
            <section>
              <p className="mb-5 text-[24px] font-semibold">Include</p>
              <div className="flex w-full flex-col">
                {tourData.facility.include.map((value) => (
                  <span className="flex gap-3" key={value}>
                    <div className="h-7 w-7">
                      <Check />
                    </div>
                    <p className="w-full dark:text-slate-400">{value}</p>
                  </span>
                ))}
              </div>
            </section>
            <section>
              <p className="mb-5 text-[24px] font-semibold">Exclude</p>
              <div className="flex w-full flex-col">
                {tourData.facility.exclude.map((value) => (
                  <span className="flex gap-3" key={value}>
                    <div className="h-7 w-7">
                      <X />
                    </div>
                    <p className="w-full dark:text-slate-400">{value}</p>
                  </span>
                ))}
              </div>
            </section>
          </div>

          <div className="mb-5 rounded-lg bg-background p-5 shadow-lg">
            <p className="mb-3 text-[24px] font-semibold">Itinerary</p>
            {tourData.itinerary.map((value, index) => (
              <Accordion type="multiple" className="w-full" key={index}>
                <AccordionItem value={index.toString()}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-col items-start gap-1">
                      <p className="font-semibold capitalize">{`Day ${
                        index + 1
                      } ${value.location}`}</p>
                      <p className="text-[14px] text-neutral-500">{`${format(
                        intervalDate[index],
                        "PP",
                      )}`}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="dark:text-slate-400">
                    {value.description}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default DetailTour;
