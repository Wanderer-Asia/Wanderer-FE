import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Swiper, SwiperSlide } from "swiper/react";
import { TripDetail, getTripDetail } from "@/utils/apis/trip";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Layout from "@/components/user/layout";
import ReviewCard from "@/components/user/review-card";
import ReviewDialog from "@/components/user/review-dialog";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { formattedAmount } from "@/utils/formattedAmount";
import { useToken } from "@/utils/context/token";

const DetailTrip = () => {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const { token } = useToken();
  const [trip, setTrip] = useState<TripDetail>();
  const [persons, setPersons] = useState<number>(1);

  useEffect(() => {
    fetchDetailTrip();
  }, []);

  const fetchDetailTrip = async () => {
    try {
      const result = await getTripDetail(tripId as string);

      setTrip(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {trip && (
        <div className="flex flex-col gap-14 p-10 md:flex-row md:overflow-hidden">
          <div className="flex-1 flex-col md:overflow-auto">
            <p className=" text-xl font-semibold">{trip?.title}</p>
            <div className="mt-4 flex flex-row justify-between">
              <div className="flex flex-row gap-5">
                <div className="flex flex-row items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" h-4 w-4 fill-black dark:fill-white"
                  >
                    <path d="M0.27002 9.35999L6.15002 15.09L4.77002 23.16L12 19.35L19.23 23.16L17.85 15.09L23.73 9.35999L15.63 8.19L12 0.869995L8.37002 8.19L0.27002 9.35999Z" />
                  </svg>
                  <p className=" text-xs">{trip?.location.name}</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="28"
                    viewBox="0 0 25 28"
                    fill="none"
                    className=" h-4 w-4 fill-black dark:fill-white"
                  >
                    <path d="M12.5 0C5.625 0 0 6.11438 0 13.5875C0 21.0606 5.625 27.175 12.5 27.175C19.375 27.175 25 21.0606 25 13.5875C25 6.11438 19.375 0 12.5 0ZM12.5 3.39688C17.6875 3.39688 21.875 7.9487 21.875 13.5875C21.875 19.2263 17.6875 23.7781 12.5 23.7781C7.3125 23.7781 3.125 19.2263 3.125 13.5875C3.125 7.9487 7.3125 3.39688 12.5 3.39688ZM10.9375 6.79376V14.3348L11.4375 14.7764L13 16.4749L14.0625 17.7657L16.3125 15.3199L15.125 14.165L14.0625 13.01V6.86169H10.9375V6.79376Z" />
                  </svg>
                  <p className=" text-xs">
                    {trip ? format(new Date(trip?.start), "d MMM yyyy") : "-"}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className=" h-4 w-4 fill-black dark:fill-white"
                >
                  <mask
                    id="mask0_97_360"
                    maskUnits="userSpaceOnUse"
                    x="1"
                    y="1"
                    width="18"
                    height="18"
                  >
                    <path
                      d="M18.3333 1.77087H1.66663V18.2481H18.3333V1.77087Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask0_97_360)">
                    <path d="M18.3219 2.90479C18.2361 3.45842 18.0222 3.99248 17.6509 4.41102C16.9227 5.27354 16.1134 6.05892 15.2384 6.77179C13.8684 7.93258 12.4526 9.03946 11.052 10.1627C10.1088 10.8814 9.14552 11.5733 8.18598 12.2694C7.73781 12.6801 7.29802 13.2017 6.61731 13.1235C5.66579 12.8699 5.98479 11.6485 6.4765 11.0985C7.21787 10.1564 8.00873 9.25365 8.81506 8.36658C10.7965 6.17621 14.4144 1.83238 17.522 1.77917C18.088 1.88747 18.3489 2.34458 18.3219 2.90479Z" />
                    <path d="M16.9012 13.8573C16.9119 14.2977 16.7295 14.6333 16.3919 14.8984C15.2945 16.012 13.0415 11.2761 12.51 10.4846C12.3357 10.1339 12.3187 9.66144 12.6249 9.39425C13.2237 8.8649 13.8286 8.34235 14.4319 7.81802C14.8288 7.41387 15.4336 6.99175 15.7732 7.7025C16.2904 9.71539 16.7367 11.7791 16.9012 13.8573Z" />
                    <path d="M5.06714 2.69154C5.10664 1.99781 5.99468 1.74865 6.56955 1.92649C8.3613 2.42219 10.1478 2.97729 11.8679 3.6801C12.2169 3.88881 12.2806 4.27677 11.9974 4.56746C11.3001 5.27829 10.5649 5.95242 9.88355 6.67929C9.65106 6.92625 9.52339 6.96458 9.24308 6.77804C8.92749 6.56804 8.61603 6.34706 8.32816 6.10115C7.55318 5.31908 5.1426 3.69542 5.06714 2.69154Z" />
                    <path d="M7.94617 17.0622C7.95896 16.871 8.09625 16.7081 8.26256 16.5606C9.41731 15.5652 10.534 14.5303 11.609 13.4494C11.7756 13.2891 11.9583 13.1447 12.1403 13.0014C12.57 12.6322 13.0453 13.1698 12.6335 13.5521C11.4029 14.77 10.154 15.9695 8.93035 17.1943C8.66571 17.5346 7.94775 17.6801 7.94617 17.0622Z" />
                    <path d="M6.23729 6.29077C5.288 7.59502 4.0254 8.68679 2.96319 9.91237C2.75723 10.1257 2.58554 10.3933 2.31498 10.5298C1.97473 10.7287 1.52947 10.3218 1.72301 9.97239C1.7931 9.83123 1.90606 9.70623 2.01829 9.59198C3.00017 8.66169 3.89359 7.64527 4.83488 6.67502C5.16731 6.39002 6.00904 5.45117 6.23729 6.29077Z" />
                    <path d="M6.20415 14.1914C5.84465 14.7898 5.1849 15.2374 4.7073 15.7528C4.17555 16.212 3.74265 16.8189 3.11647 17.151C2.97909 17.2142 2.83401 17.2024 2.71849 17.0876C2.47099 16.8426 2.72597 16.5118 2.90743 16.3173C3.74828 15.5275 4.59603 14.745 5.44295 13.9616C5.69399 13.6529 6.19795 13.6797 6.20415 14.1914Z" />
                    <path d="M9.94096 13.4421C9.84812 15.1958 7.92089 14.2893 8.19246 12.9443C8.28937 12.5538 8.72337 12.3723 8.99929 12.1154C9.1971 11.9614 9.41683 12.0232 9.6196 12.0943C9.89118 12.2512 9.84935 13.1015 9.94096 13.4421Z" />
                    <path d="M4.98303 9.72258C5.29743 8.88919 6.20257 8.94429 6.86409 9.32938C7.69509 9.78335 6.70699 10.495 6.34551 10.9131C6.29382 10.9652 6.17851 10.9974 6.10705 10.9797C5.44859 10.8518 5.14562 10.349 4.98303 9.72258Z" />
                    <path d="M12.7422 18.239C12.2367 18.2639 12.1206 17.7653 12.432 17.4712C12.6058 17.3108 12.7795 17.1503 12.9498 16.9863C13.3192 16.6305 13.686 16.272 14.055 15.9158C14.1994 15.762 14.4541 15.6924 14.6066 15.8544C14.7722 16.0044 14.7101 16.2591 14.557 16.4059C14.1728 16.8232 13.7872 17.2392 13.4026 17.6561C13.2319 17.8653 12.9738 18.1444 12.7422 18.239Z" />
                    <path d="M2.97396 5.39898C2.53079 5.40729 2.32827 4.96794 2.5879 4.66931C2.69104 4.55089 2.81163 4.44708 2.92877 4.34156C3.22442 4.09012 3.49702 3.80435 3.81446 3.58127C4.15021 3.37877 4.53429 3.76952 4.33433 4.10356C4.02506 4.50896 3.62998 4.84987 3.274 5.21489C3.17677 5.308 3.0399 5.35975 2.97396 5.39898Z" />
                  </g>
                </svg>
                <p className=" text-xs">{trip?.airline.name}</p>
              </div>
            </div>
            <Separator className="mt-3 bg-tyellow" />
            <Swiper
              spaceBetween={30}
              effect={"fade"}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[EffectFade, Navigation, Pagination, Autoplay]}
              className="mt-8 h-[27rem]"
              autoplay={{
                delay: 30000,
                disableOnInteraction: false,
              }}
            >
              {trip?.picture.map((item, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={item}
                    alt="banner"
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-8 flex flex-col gap-8">
              <label className="text-xl font-semibold">Overview</label>
              <p className=" text-justify">{trip?.description}</p>
            </div>

            <div className="mt-8 flex flex-col md:hidden">
              <div className="flex flex-col items-center rounded-sm border border-tyellow p-5">
                <p className=" font-semibold">RP 25.000.000/pax</p>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger className="rounded-sm bg-tyellow">
                          1
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="overflow max-h-56">
                          <DropdownMenuItem>1</DropdownMenuItem>
                          <DropdownMenuItem>2</DropdownMenuItem>
                          <DropdownMenuItem>3</DropdownMenuItem>
                          <DropdownMenuItem>4</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className=" text-sm font-normal">Rp 25.000.000</p>
                    <p className=" text-sm font-normal">Rp 5.000</p>
                    <p className=" text-sm font-normal">Rp 2.500.000</p>
                  </div>
                </div>
                <Separator className="my-6 bg-tyellow" />
                <div className="flex flex-row gap-8">
                  <div className="flex flex-col gap-5">
                    <p className=" text-sm font-normal">Total</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    <p className=" text-sm font-normal">Rp 22.505.000</p>
                  </div>
                </div>
                <Button className="mt-7 rounded-sm bg-tyellow text-white hover:bg-tyellowlight">
                  Book
                </Button>
              </div>
            </div>

            <div className=" mt-8 flex flex-col gap-5 p-5 shadow-xl md:mx-5">
              <label className="text-xl font-semibold">Included/Excluded</label>
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex-1 flex-col">
                  {trip?.facility.include.map((item) => (
                    <div className="mt-3 flex flex-row items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        className="fill-black dark:fill-white"
                      >
                        <path d="M13.065 0.677734L11.6586 2.27293L5.99236 8.43214L4.3414 6.70401L2.87389 5.10882L0 8.23274L1.46752 9.82793L4.52484 13.1512L5.93121 14.7464L7.39873 13.1512L14.5325 5.39684L16 3.80165L13.065 0.677734Z" />
                      </svg>
                      <p className=" text-sm font-normal">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex-col">
                  {trip?.facility.exclude.map((item) => (
                    <div className="mt-3 flex flex-row items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="17"
                        viewBox="0 0 15 17"
                        fill="none"
                        className="fill-black dark:fill-white"
                      >
                        <path d="M2.69427 0.503662L0 3.43233L1.3758 4.92783L4.77707 8.68733L1.3758 12.3845L0 13.8177L2.69427 16.8087L4.07006 15.3132L7.52866 11.5537L10.9299 15.3132L12.2484 16.8087L15 13.8177L13.6242 12.3845L10.1656 8.68733L13.6242 4.92783L15 3.43233L12.2484 0.503662L10.9299 1.99915L7.52866 5.69634L4.07006 1.99915L2.69427 0.503662Z" />
                      </svg>
                      <p className=" text-sm font-normal">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-5">
              <label className="text-xl font-semibold">Itinerary</label>
              {trip?.itinerary.map((item, index) => (
                <Accordion
                  key={index}
                  type="single"
                  collapsible
                  className="items-center p-5 shadow-lg md:mx-5"
                >
                  <AccordionItem
                    value="item-1"
                    className=" border-none fill-black"
                  >
                    <AccordionTrigger>
                      <div className="flex flex-row items-center gap-14">
                        <div className="flex flex-col text-left">
                          <h1 className="text-xl">Day {index + 1}</h1>
                          <p className="text-xs">12 Dec 2023</p>
                        </div>
                        <h1 className="text-xl">{item.location}</h1>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{item.description}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-5">
              <label className="text-xl font-semibold">Review</label>
              <ReviewDialog />
              {trip?.reviews.map((item, index) => (
                <ReviewCard data={item} key={index} />
              ))}
            </div>
          </div>
          <div className="hidden flex-col md:flex ">
            <div className="flex flex-col items-center rounded-sm border border-tyellow p-5">
              <p className=" font-semibold">RP 25.000.000/pax</p>
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
                  </div>
                  <p className=" text-sm font-normal">
                    {formattedAmount(trip.price)}
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
              <Button
                onClick={() =>
                  token ? navigate(`/booking/${tripId}`) : navigate("/login")
                }
                className="mt-7 rounded-sm bg-tyellow text-white hover:bg-tyellowlight"
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DetailTrip;
