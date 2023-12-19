import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileTable = () => {
  const navigate = useNavigate();

  const buttonCondition = (status: number) => {
    let buttonTable;
    if (status === 1) {
      buttonTable = (
        <Button
          type="button"
          variant="outline"
          className=" w-24 text-red-600 outline outline-red-600"
          onClick={() => navigate("/booking/1")}
        >
          Pay Now
        </Button>
      );
    }
    if (status === 2) {
      buttonTable = (
        <Button
          type="button"
          variant="outline"
          className=" outline-t-yellow w-24 text-tyellow outline"
          onClick={() => navigate("/detail-trip/1")}
        >
          Paid
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
            <th className="px-4 py-7">User Id</th>
            <th className="px-4 py-7">Quantity</th>
            <th className="px-4 py-7">Code Book</th>
            <th className="px-4 py-7">Trip Id</th>
            <th className="px-4 py-7">Payment</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 1].map((item, index) => (
            <tr className="text-center">
              <td className="px-4 py-7">Ms. Dona</td>
              <td className="px-4 py-7">2</td>
              <td className="px-4 py-7">ff1 234 121</td>
              <td className="px-4 py-7">Japan 6 days</td>
              <td className="px-4 py-7">{buttonCondition(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
