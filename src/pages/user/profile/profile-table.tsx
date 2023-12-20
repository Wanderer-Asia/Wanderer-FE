import { Button } from "@/components/ui/button";
import React from "react";
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
          onClick={() => navigate(`/booking/${tour_id}/${booking_code}`)}
        >
          Pay Now
        </Button>
      );
    } else {
      buttonTable = (
        <Button
          type="button"
          variant="outline"
          className=" outline-t-yellow w-24 text-tyellow outline"
          onClick={() => navigate(`/detail-trip/${booking_code}`)}
        >
          {status}
        </Button>
      );
    }
    return buttonTable;
  };
  return (
    <div className=" m-10 border border-tyellow p-10">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className=" border-b border-b-tyellow">
            <th className="px-4 py-7">Trip</th>
            <th className="px-4 py-7">Quantity</th>
            <th className="px-4 py-7">Code Book</th>
            <th className="px-4 py-7">Trip Id</th>
            <th className="px-4 py-7">Payment</th>
          </tr>
        </thead>
        <tbody>
          {user.bookings &&
            user.bookings.map((item, index) => (
              <tr className="text-center" key={index}>
                <td className="px-4 py-7 text-left">{item.tour.title}</td>
                <td className="px-4 py-7">{item.detail_count}</td>
                <td className="px-4 py-7">{item.booking_code}</td>
                <td className="px-4 py-7">{item.tour.tour_id}</td>
                <td className="px-4 py-7">
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
