import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/user/layout";
import PaymentDialog from "@/components/user/payment-dialog";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="container overflow-auto p-10">
        <label className="text-2xl font-semibold">Detail Booking</label>
        <div className="mt-10 flex flex-col">
          <label className="text-xl font-semibold">Passenger Details</label>
          {["adult 1", "adult 2"].map((item, index) => (
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
                    <input className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none" />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">Nationality</p>
                    <input className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none" />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">Name</p>
                    <input className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none" />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">NIK/NO Passport</p>
                    <input className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none" />
                  </div>
                  <div className="flex flex-row items-center ">
                    <p className="w-64 text-sm font-normal">Birth Date</p>
                    <input
                      type="date"
                      className=" w-full rounded-sm bg-tblueLight p-2 text-gray-800 outline-none"
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
                <p className="font-semibold">RP. 25.000.000</p>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center ">
                  <p className=" w-64 font-semibold">Admin</p>
                  <p className="font-semibold">RP. 5.000</p>
                </div>
                <div className="flex flex-row items-center ">
                  <p className=" w-64 font-semibold">Discount</p>
                  <p className="font-semibold">RP. 2.500.000</p>
                </div>
              </div>
            </div>
            <Separator className="my-6 bg-tyellow" />
            <div className="m-5 grid grid-cols-2 gap-8">
              <div className="flex flex-row">
                <p className=" w-64 font-semibold">Total</p>
                <p className="font-semibold">RP. 22.505.000</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-row items-center justify-between border border-tyellow p-5 shadow-lg">
            <p className=" w-64 font-semibold">Total</p>

            <PaymentDialog />
          </div>

          <div className="mt-14 flex items-center space-x-2">
            <Checkbox id="terms" />
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
              onClick={() => navigate("/payment/1")}
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
