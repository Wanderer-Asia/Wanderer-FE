import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookingData, Persons, createBooking } from "@/utils/apis/booking";
import { TripDetail, getTripDetail } from "@/utils/apis/trip";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/user/layout";
import PaymentDialog from "@/components/user/payment-dialog";
import { Separator } from "@/components/ui/separator";
import { formattedAmount } from "@/utils/formattedAmount";
import { useToast } from "@/components/ui/use-toast";

const Booking = () => {
  const { toast } = useToast();
  const { tripId, persons } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<TripDetail>();
  const [data, setData] = useState<BookingData>({
    tour_id: Number(tripId),
    payment_method: "",
    detail: [],
  });
  const [term, setTerm] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handlePayment = (value: string) => {
    setData({ ...data, payment_method: value });
  };

  useEffect(() => {
    updatePerson();
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

  const updatePerson = () => {
    const arr: Persons[] = [];
    for (let i = 0; i < Number(persons); i++) {
      arr.push({
        document_number: "",
        greeting: "",
        name: "",
        nationality: "",
        dob: "",
      });
    }
    setData({ ...data, detail: arr });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    field: keyof Persons,
  ) => {
    // const updatedDetail = [...data.detail];
    // updatedDetail[index][field] = event.target.value;
    // setData({ ...data, detail: updatedDetail });
    const { value } = event.target;

    let updatedValue: string | Date = value;

    if (field === "dob") {
      const date = new Date(value);
      const formattedDate = date.toISOString();

      updatedValue = formattedDate;
    }

    const updatedDetail = [...data.detail];
    updatedDetail[index][field] = updatedValue;
    data.detail.map((d) => {
      if (
        d.dob.length > 0 &&
        d.greeting.length > 0 &&
        d.name.length > 0 &&
        d.nationality.length > 0 &&
        d.document_number.length > 0
      ) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    });

    setData({ ...data, detail: updatedDetail });
  };

  const handleBooking = async () => {
    try {
      const result = await createBooking(data);
      console.log(result);
      if (result.data) {
        navigate(`/payment/${tripId}/${result.data.booking_code}`);
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Layout>
      <div className="container overflow-auto p-10">
        <label className="text-2xl font-semibold">Detail Booking</label>
        <div className="mt-10 flex flex-col">
          <label className="text-xl font-semibold">Passenger Details</label>
          {data.detail.map((item, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="mt-5 items-center border border-tyellow px-5 shadow-lg"
            >
              <AccordionItem value="item-1" className=" border-none fill-black">
                <AccordionTrigger>
                  <h1 className="text-xl">Adult {index + 1}</h1>
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-2 gap-8">
                  <div className="flex flex-row items-center ">
                    <p className=" w-64 text-sm font-normal">Greeting</p>
                    <input
                      className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none"
                      value={item.greeting}
                      onChange={(e) => handleInputChange(e, index, "greeting")}
                    />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">Nationality</p>
                    <input
                      className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none"
                      value={item.nationality}
                      onChange={(e) =>
                        handleInputChange(e, index, "nationality")
                      }
                    />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">Name</p>
                    <input
                      className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none"
                      value={item.name}
                      onChange={(e) => handleInputChange(e, index, "name")}
                    />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">NIK/NO Passport</p>
                    <input
                      className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none"
                      value={item.document_number}
                      onChange={(e) =>
                        handleInputChange(e, index, "document_number")
                      }
                    />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">Birth Date</p>
                    <input
                      type="date"
                      className="w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none"
                      value={item.dob ? item.dob.split("T")[0] : ""}
                      onChange={(e) => handleInputChange(e, index, "dob")}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

          <div className="mt-5 items-center border border-tyellow shadow-lg">
            <div className="m-5 grid grid-cols-2 gap-8">
              <div className="flex flex-row">
                <p className=" w-64 font-semibold">Subtotal</p>
                <p className="font-semibold">
                  {trip && formattedAmount(trip.price * Number(persons))}
                </p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center ">
                  <p className=" w-64 font-semibold">Admin</p>
                  <p className="font-semibold">
                    {trip && formattedAmount(trip.admin_fee)}
                  </p>
                </div>
                <div className="flex flex-row items-center ">
                  <p className=" w-64 font-semibold">Discount</p>
                  <p className="font-semibold">
                    {trip && formattedAmount(trip.discount)}
                  </p>
                </div>
              </div>
            </div>
            <Separator className="my-6 bg-tyellow" />
            <div className="m-5 grid grid-cols-2 gap-8">
              <div className="flex flex-row">
                <p className=" w-64 font-semibold">Total</p>
                <p className="font-semibold">
                  {trip &&
                    formattedAmount(
                      trip.price * Number(persons) +
                        trip.admin_fee -
                        trip.discount * Number(persons),
                    )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-row items-center justify-between border border-tyellow p-5 shadow-lg">
            <p className=" w-64 font-semibold"></p>

            <PaymentDialog onSelect={handlePayment} isValid={isFormValid} />
          </div>

          <div className="mt-14 flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={(value: boolean) => setTerm(value)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              By ticking, you are confirming that you have already read all the
              details and input correct information
            </label>
          </div>

          <div className="mt-14 flex flex-row justify-end">
            <Button
              type="button"
              variant="secondary"
              className=" bg-tyellow px-10 hover:bg-tyellowlight"
              disabled={!term || !isFormValid}
              onClick={handleBooking}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;
