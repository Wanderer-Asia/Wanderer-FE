import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BookingDetail } from "@/utils/apis/booking/type";
import { Button } from "@/components/ui/button";
import Layout from "@/components/user/layout";
import { differenceInHours } from "date-fns";
import { formattedAmount } from "@/utils/formattedAmount";
import { getBookingDetail } from "@/utils/apis/booking";
import { useToken } from "@/utils/context/token";

const Payment = () => {
  const navigate = useNavigate();
  const { fetchProfile } = useToken();
  const { bookingId } = useParams();
  const [bookingData, setBookingData] = useState<BookingDetail>();

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const result = await getBookingDetail(bookingId as string);

      if (result?.data) {
        setBookingData(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paymentLogo = (payment: string) => {
    if (payment === "bca") {
      return (
        <img
          className="h-26 w-56"
          src="https://s3-alpha-sig.figma.com/img/50a0/851b/812e75c05619a4cde0c3e7bc432f5c29?Expires=1703462400&Signature=eR818RROilPgpwX1GNzVoLUVbtmviFmametU3SDD4HBhkLyBHEb-d-DHATtnZ4DckKLv1NJfPlxoOsFJ5ftJ8eHLUevStrfYGrJSwj3vM~ZisyrA~a~JRBDyirpzYZwylciFpb~bk9XkEVHiRdNSMnsSIyUbLgz6zFqvGYi9Rkb7Yyi1oEAs1regb5nGgaBpyoBF-GCcgvOnCwzXsUgJAa0xT~INqXPO0J~vqYu5vG6hPlcS3u4e9X3NoggfVRPDwanh9IVWLV8U-6haRAF5-oQMdmOkYeDbltQaO6hQZvH2AiZuEXo435L9W7C9OKNZMnrnCkKjLl0lcosato9XEA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      );
    }
    if (payment === "bni") {
      return (
        <img
          className="h-26 w-56"
          src="https://s3-alpha-sig.figma.com/img/adb6/2ac8/647bf1a6c87148864bbb4cd44130da36?Expires=1703462400&Signature=nVaFZxyES07zE7BHBBI092tk73KUhT0aofbMV0O4xKtD7M7GVGZ4ci9E-uftylO4lLr43gdr7MOqpcjzjyryis33c~XNGBnKrEtXdEg8d9aIGhkWFT0kKYa1yUHPXgQJ~Nz4~LPzDw1qu5b~sUVstecsP0LJ2L~yZesxuVeWU97LYbJlwF6t520a0cXev~2iELID3A8NdNFyG3r7PsuLxTKR4-Hat2p9ENIU8~3mfIu468C0YxHxKgZacP9sQLhVUSVkbW2imfcW5fQXBksUF1eNQyZtlcmw4VXpbgFsyN8~uniYwQEwR9FE8JX1ataYiynNJEsMv~YV5H8pGr03UQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      );
    }
    if (payment === "bri") {
      return (
        <img
          className="h-26 w-56"
          src="https://s3-alpha-sig.figma.com/img/e1a4/cd8b/a532510665081e719366b8574a3a12ba?Expires=1703462400&Signature=TnF8KoL-OpmCzoCTwqRaexmGQrYn4Ih5X44S7n~2BNRhAIWTFr6kmRUTa-tnWHeQGpljvX3Wq1bXMuSzYArJ5Yd~jaBTiaIQu0i5sEC1jyohnpwSdANVTA~Sx4dXGvujR6oP-iaYXZqPSdNm2CmwbP2j0nnO6TQSxp9bwBNozMftgQiuvLYFbZB9iv3NFX4ykMNkEPRk1yJhdsol4wm5ZbsKwHRzpnl1-~Hj4gXmzcwiPsJH7O1WBCau7KGp6hbKQbDGrjQ49HpVR-VUbHqE0g7zMvG5omU2-yDyZ6-QBTyOV1XdwS2zn-wZqsaGXKgwm9z3~D0d3Ppi62EvtFkjYg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      );
    }
    if (payment === "mandiri") {
      return (
        <img
          className="h-26 w-56"
          src="https://s3-alpha-sig.figma.com/img/b3ee/2a72/1ac9c2dc8109129ae737af6f0760eb11?Expires=1703462400&Signature=cJKjPsNmPR6VaY21f9JdpGHzYGdkwF8-1wa8~bDu1j83zHludfCnrf~r8T2pZ4K0s80jEiaxAdhWqIVgUFDE1bP64Pamnb7CWk0MmXV7ws4CxrSq7WR8nrVjWgbquq~EM80W3Uh7~tSQva40M-A5SdyvWdqkpjJq6ygdjpPGyS3NaBgx-V6o16KjJ3IqcnsSuKARGcQ1HkpuoJfbT52Trq-PjqHmCCha39yBCris~2WZ1jp3J3zR7tXS7qaKFtkm7W-NghlQUJ9rdsthCaP0GWrnrbCYEDNas1tZYfj~vWJLrYTBWTgMtFqhBbNLtK8TcfPsNnaNn6Sl-d7IGPjizA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        />
      );
    }
  };

  return (
    <Layout>
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
              <p className=" text-2xl font-semibold">{bookingData?.key_bill}</p>
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
    </Layout>
  );
};

export default Payment;
