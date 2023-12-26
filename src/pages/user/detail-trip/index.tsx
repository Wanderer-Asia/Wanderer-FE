import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Swiper, SwiperSlide } from "swiper/react";
import { TripDetail, getTripDetail } from "@/utils/apis/trip";
import { getBookingDetail, refundBooking } from "@/utils/apis/booking";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BookingDetail } from "@/utils/apis/booking/type";
import { Button } from "@/components/ui/button";
import DetailTripHeader from "./detail-trip-header";
import DetailTripInclude from "./detail-trip-include";
import DetailTripItenary from "./detail-trip-itenary";
import DetailTripReview from "./detail-trip-review";
import Layout from "@/components/user/layout";
import Loading from "@/components/Loading";
import { Separator } from "@/components/ui/separator";
import { formattedAmount } from "@/utils/formattedAmount";
import { useToken } from "@/utils/context/token";

const DetailTrip = () => {
  const navigate = useNavigate();
  const { tripId, bookingId } = useParams();
  const { token } = useToken();
  const [trip, setTrip] = useState<TripDetail>();
  const [persons, setPersons] = useState<number>(1);
  const [bookingData, setBookingData] = useState<BookingDetail>();

  useEffect(() => {
    fetchDetailTrip();
    if (bookingId) {
      fetchBooking();
    }
  }, []);

  const fetchDetailTrip = async () => {
    try {
      const result = await getTripDetail(tripId as string);

      setTrip(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBooking = async () => {
    try {
      const result = await getBookingDetail(bookingId as string);

      if (result?.data) {
        setBookingData(result.data);
        setPersons(result.data.detail_count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefund = async () => {
    if (
      bookingData?.status !== "refund" &&
      bookingData?.status !== "refunded"
    ) {
      try {
        const result = await refundBooking(bookingId as string);

        if (result?.message) {
          fetchBooking();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleRefundText = () => {
    if (bookingData?.status === "refunded") {
      return "Refunded";
    } else if (bookingData?.status === "refund") {
      return "Pending Refund";
    } else {
      return "Refund";
    }
  };

  return (
    <Layout>
      {!trip ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-14 p-10 md:flex-row md:overflow-hidden">
          <div className="flex-1 flex-col md:overflow-auto">
            <p className=" text-xl font-semibold">{trip?.title}</p>
            <DetailTripHeader trip={trip} />
            <Separator className="mt-3 bg-tyellow" />
            <div className="h-[25rem] w-full">
              <Swiper
                spaceBetween={30}
                effect={"fade"}
                navigation={true}
                pagination={{
                  clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="mt-8"
                autoplay={{
                  delay: 30000,
                  disableOnInteraction: false,
                }}
              >
                {trip?.picture &&
                  trip?.picture.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={item}
                        alt="banner"
                        className="h-full w-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="mt-8 flex flex-col gap-8">
              <label className="text-xl font-semibold">Overview</label>
              <p className=" text-justify">{trip?.description}</p>
            </div>

            <div className="mt-8 flex flex-col md:hidden">
              <div className="flex flex-col items-center rounded-sm border border-tyellow p-5">
                <p className=" font-semibold">
                  {formattedAmount(trip.price)}/pax
                </p>
                <Separator className="my-6 bg-tyellow" />
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col gap-5">
                    <p className=" text-sm font-normal">Persons</p>
                    <p className=" text-sm font-normal">Subtotal</p>
                    <p className=" text-sm font-normal">Admin</p>
                    <p className=" text-sm font-normal">Discount</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                      {bookingData?.booking_code === Number(bookingId) ? (
                        persons
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="rounded-sm bg-tyellow">
                            {persons}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="overflow max-h-56">
                            {[1, 2, 3, 4, 5].map((item) => (
                              <DropdownMenuItem
                                key={item}
                                onClick={() => {
                                  setPersons(item);
                                }}
                              >
                                {item}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                    <p className=" text-sm font-normal">
                      {formattedAmount(trip.price * persons)}
                    </p>
                    <p className=" text-sm font-normal">
                      {formattedAmount(trip.admin_fee)}
                    </p>
                    <p className=" text-sm font-normal">
                      {formattedAmount(trip.discount)}
                    </p>
                  </div>
                </div>
                <Separator className="my-6 bg-tyellow" />
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col gap-5">
                    <p className=" text-sm font-normal">Total</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className=" text-sm font-normal">
                      {formattedAmount(
                        trip.price * persons +
                          trip.admin_fee -
                          trip.discount * persons,
                      )}
                    </p>
                  </div>
                </div>
                {bookingId ? (
                  <Button
                    onClick={handleRefund}
                    className="mt-7 rounded-sm bg-tyellow text-white hover:bg-tyellowlight"
                  >
                    {handleRefundText()}
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      token
                        ? navigate(`/booking/${tripId}/${persons}`)
                        : navigate("/login")
                    }
                    className="mt-7 rounded-sm bg-tyellow text-white hover:bg-tyellowlight"
                  >
                    Book
                  </Button>
                )}
              </div>
            </div>

            <DetailTripInclude trip={trip} />

            <DetailTripItenary trip={trip} />

            <DetailTripReview
              trip={trip}
              bookingData={bookingData}
              fetchDetailTrip={fetchDetailTrip}
            />
          </div>
          <div className="hidden flex-col md:flex ">
            <div className="flex flex-col items-center rounded-sm border border-tyellow p-5">
              <p className=" font-semibold">
                {formattedAmount(trip.price)}/pax
              </p>
              <Separator className="my-6 bg-tyellow" />
              <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-5">
                  <p className=" text-sm font-normal">Persons</p>
                  <p className=" text-sm font-normal">Subtotal</p>
                  <p className=" text-sm font-normal">Admin</p>
                  <p className=" text-sm font-normal">Discount</p>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    {bookingData?.booking_code === Number(bookingId) ? (
                      persons
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-sm bg-tyellow">
                          {persons}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="overflow max-h-56">
                          {[1, 2, 3, 4, 5].map((item) => (
                            <DropdownMenuItem
                              key={item}
                              onClick={() => {
                                setPersons(item);
                              }}
                            >
                              {item}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  <p className=" text-sm font-normal">
                    {formattedAmount(trip.price * persons)}
                  </p>
                  <p className=" text-sm font-normal">
                    {formattedAmount(trip.admin_fee)}
                  </p>
                  <p className=" text-sm font-normal">
                    {formattedAmount(trip.discount)}
                  </p>
                </div>
              </div>
              <Separator className="my-6 bg-tyellow" />
              <div className="flex flex-row gap-8">
                <div className="flex flex-col gap-5">
                  <p className=" text-sm font-normal">Total</p>
                </div>
                <div className="flex flex-col gap-5">
                  <p className=" text-sm font-normal">
                    {formattedAmount(
                      trip.price * persons +
                        trip.admin_fee -
                        trip.discount * persons,
                    )}
                  </p>
                </div>
              </div>
              {bookingData?.booking_code === Number(bookingId) ? (
                <Button
                  onClick={handleRefund}
                  className="mt-7 rounded-sm bg-tyellow text-white hover:bg-tyellowlight"
                >
                  {handleRefundText()}
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    token
                      ? navigate(`/booking/${tripId}/${persons}`)
                      : navigate("/login")
                  }
                  className="mt-7 rounded-sm bg-tyellow text-white hover:bg-tyellowlight"
                >
                  Book
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailTrip;
