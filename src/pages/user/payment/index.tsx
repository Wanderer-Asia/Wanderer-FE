import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BookingDetail } from "@/utils/apis/booking/type";
import { Button } from "@/components/ui/button";
import Layout from "@/components/user/layout";
import Loading from "@/components/Loading";
import { differenceInHours } from "date-fns";
import { formattedAmount } from "@/utils/formattedAmount";
import { getBookingDetail } from "@/utils/apis/booking";
import { useToken } from "@/utils/context/token";

const Payment = () => {
  const navigate = useNavigate();
  const { fetchProfile } = useToken();
  const { bookingId } = useParams();
  const [bookingData, setBookingData] = useState<BookingDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      setIsLoading(true);
      const result = await getBookingDetail(bookingId as string);

      if (result?.data) {
        setBookingData(result.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const paymentLogo = (payment: string) => {
    if (payment === "bca") {
      return (
        <img
          className="h-26 w-56"
          src="https://res.cloudinary.com/dypeyso0m/image/upload/v1703677027/bca_u8s8de.png"
        />
      );
    }
    if (payment === "bni") {
      return (
        <img
          className="h-26 w-56"
          src="https://res.cloudinary.com/dypeyso0m/image/upload/v1703677155/647bf1a6c87148864bbb4cd44130da36_bl9g38.png"
        />
      );
    }
    if (payment === "bri") {
      return (
        <img
          className="h-26 w-56"
          src="https://res.cloudinary.com/dypeyso0m/image/upload/v1703677142/bri_tjmr7e.png"
        />
      );
    }
    if (payment === "mandiri") {
      return (
        <img
          className="h-26 w-56"
          src="https://res.cloudinary.com/dypeyso0m/image/upload/v1703677127/mandiri_keuvdx.png"
        />
      );
    }
  };

  return (
    <Layout>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          {bookingData && paymentLogo(bookingData?.payment_method)}
          <div className="mt-16 flex flex-col items-center gap-3">
            {bookingData?.payment_method === "mandiri" ? (
              <>
                <p className=" text-lg font-normal">Biller Code</p>
                <p className=" text-2xl font-semibold">
                  {bookingData?.code_bill}
                </p>
                <p className=" text-lg font-normal">Bill Key</p>
                <p className=" text-2xl font-semibold">
                  {bookingData?.key_bill}
                </p>
              </>
            ) : (
              <>
                {" "}
                <p className=" text-lg font-normal">Virtual Account</p>
                <p className=" text-2xl font-semibold">
                  {bookingData?.virtual_number}
                </p>
              </>
            )}

            <div className="flex flex-row gap-10">
              <p className=" text-lg font-semibold">Total need to pay</p>
              <p className=" text-lg font-semibold">
                {bookingData && formattedAmount(bookingData?.total)}
              </p>
            </div>
            <Button
              type="button"
              variant="secondary"
              className=" mt-4 bg-tyellow hover:bg-tyellowlight"
              onClick={() => {
                fetchProfile();
                navigate("/profile");
              }}
            >
              Check Payment Status
            </Button>
          </div>
          <p className="mt-36">
            Please finish the payment before{" "}
            {bookingData &&
              differenceInHours(
                new Date(bookingData?.payment_expired),
                new Date(),
              )}{" "}
            Hours
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Payment;
