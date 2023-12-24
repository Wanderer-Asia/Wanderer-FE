import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToken } from "@/utils/context/token";

const ProfileTable = () => {
  const { user } = useToken();
  const navigate = useNavigate();

  const buttonCondition = (
    status: string,
    booking_code: number,
    tour_id: number,
  ) => {
    let buttonTable;
    if (status === "pending") {
      buttonTable = (
        <Button
          type="button"
          variant="outline"
          className=" w-24 text-red-600 outline outline-red-600"
          onClick={() => navigate(`/payment/${tour_id}/${booking_code}`)}
        >
          Pay Now
        </Button>
      );
    } else if (status === "refund" || status === "refunded") {
      buttonTable = (
        <Button
          type="button"
          variant="outline"
          className=" outline-t-yellow w-24 capitalize text-tyellow outline"
          onClick={() => navigate(`/detail-trip/${tour_id}/${booking_code}`)}
        >
          {status}
        </Button>
      );
    } else {
      buttonTable = (
        <Button
          type="button"
          variant="outline"
          className=" outline-t-yellow w-24 text-tyellow outline"
          onClick={() => navigate(`/detail-trip/${tour_id}/${booking_code}`)}
        >
          Paid
        </Button>
      );
    }
    return buttonTable;
  };
  return (
    <div className="m-10 border border-tyellow p-10">
      <table className="min-w-full border-collapse text-xs md:text-base">
        <thead>
          <tr className="items-center border-b border-b-tyellow">
            <th className="px-2 py-7 md:px-4">Trip</th>
            <th className="hidden px-4 py-7 md:flex">Quantity</th>
            <th className="px-2 py-7 md:px-4">Code Book</th>
            <th className="hidden px-4 py-7 md:flex">Trip Id</th>
            <th className="px-2 py-7 md:px-4">Payment</th>
          </tr>
        </thead>
        <tbody>
          {user.bookings &&
            user.bookings.map((item, index) => (
              <tr className="items-center text-center" key={index}>
                <td className="px-2 py-7 text-left md:px-4">
                  {item.tour.title}
                </td>
                <td className="hidden px-2 py-7 md:flex md:px-4">
                  {item.detail_count}
                </td>
                <td className="px-4 py-7">{item.booking_code}</td>
                <td className="hidden px-2 py-7 md:flex md:px-4">
                  {item.tour.tour_id}
                </td>
                <td className="px-2 py-7 md:px-4">
                  {buttonCondition(
                    item.status,
                    item.booking_code,
                    item.tour.tour_id,
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
