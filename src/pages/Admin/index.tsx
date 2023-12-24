import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarChart from "@/components/Admin/BarChart";

import { Banknote, Palmtree, PlaneTakeoff, Users } from "lucide-react";

import TourCard from "@/components/Admin/TourCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { IDashboard } from "@/utils/apis/dashboard";
import { getDashboardReports } from "@/utils/apis/dashboard/api";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Loading";

const Dashboard = () => {
  const { toast } = useToast();
  const [data, setData] = useState<IDashboard>();
  const [loading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardReports();

      setData(res?.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: <p className="capitalize">{error.message}</p>,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const { innerWidth: width } = window;

    if (width < 769) {
      setIsMobile(true);
    }
    if (width > 769) {
      setIsMobile(false);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-5 min-h-screen w-full">
          <div className="grid h-fit w-full grid-cols-2 gap-3 rounded-xl bg-background p-5 shadow-lg dark:border lg:h-[155px] lg:grid-cols-4">
            <div className="flex items-center justify-center gap-5">
              <div className="h-15 w-15 flex items-center justify-center rounded-full bg-[#FFA3CF] p-5 md:h-20 md:w-20">
                <Users className="h-full w-full stroke-[#DA001A]" />
              </div>
              <div className="leading-6">
                <p className="text-[23px] font-semibold text-[#333333] dark:text-white lg:text-[32px]">
                  {data?.total_user}
                </p>
                <p className="text-[12px] text-neutral-400 lg:text-[14px]">
                  Total Wanderers
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div className="h-15 w-15 flex items-center justify-center rounded-full bg-[#CAF1FF] p-5 md:h-20 md:w-20">
                <Banknote className="h-full w-full stroke-[#0F5FC2]" />
              </div>
              <div className="leading-6">
                <p className="text-[23px] font-semibold text-[#333333] dark:text-white lg:text-[32px]">
                  {data?.total_booking}
                </p>
                <p className="text-[12px] text-neutral-400 lg:text-[14px]">
                  Transaction
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div className="h-15 w-15 flex items-center justify-center rounded-full bg-[#D3FFE7] p-5 md:h-20 md:w-20">
                <Palmtree className="h-full w-full stroke-[#00AC4F]" />
              </div>
              <div className="leading-6">
                <p className="text-[23px] font-semibold text-[#333333] dark:text-white lg:text-[32px]">
                  {data?.total_location}
                </p>
                <p className="text-[12px] text-neutral-400 lg:text-[14px]">
                  Total Destination
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5">
              <div className="h-15 w-15 flex items-center justify-center rounded-full bg-[#e7d3ff] p-5 md:h-20 md:w-20">
                <PlaneTakeoff className="h-full w-full stroke-[#3400ac]" />
              </div>
              <div className="leading-6">
                <p className="text-[23px] font-semibold text-[#333333] dark:text-white lg:text-[32px]">
                  {data?.total_tour}
                </p>
                <p className="text-[12px] text-neutral-400 lg:text-[14px]">
                  Total Tours
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex w-full flex-col gap-5 lg:flex-row">
            <div className="w-full rounded-lg bg-background p-5 shadow-lg dark:border lg:w-[55%]">
              <p className="mb-1 w-full text-[16px] font-medium dark:text-neutral-400">
                Transactions /month
              </p>
              <BarChart graph_booking={data?.graph_booking} />
            </div>
            <div className="grow rounded-lg bg-background p-5 shadow-lg dark:border">
              <p className="font-medium dark:text-neutral-400">
                Recent Transactions
              </p>
              <Table className="text-[12px]">
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Booking Code</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.recent_booking.map((booking, index) => (
                    <TableRow key={booking.booking_code}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{booking.booking_code}</TableCell>
                      <TableCell>{booking.location}</TableCell>
                      <TableCell>{booking.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-5 grid w-full grid-cols-1 rounded-lg bg-background shadow-lg dark:border">
            <p className="pl-5 pt-5 font-medium">Top 5 Tour Destinations</p>
            <Swiper
              slidesPerView={isMobile ? 2 : 3}
              scrollbar={{
                hide: true,
              }}
              modules={[Scrollbar]}
              className="mySwiper rounded-lg"
            >
              {data?.top_tours.map((tour) => (
                <SwiperSlide className="py-4" key={tour.tour_id}>
                  <TourCard tourData={tour} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
