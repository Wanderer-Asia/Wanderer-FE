import { Trip, getTrip } from "@/utils/apis/trip";
import { useEffect, useState } from "react";

import Layout from "@/components/user/layout";
import TripCard from "@/components/user/trip-card";

const BestDeals = () => {
  const [trip, setTrip] = useState<Trip[]>([]);

  useEffect(() => {
    fetchTour();
  }, []);

  const fetchTour = async () => {
    try {
      const result = await getTrip("", 0, 0, "discount");
      console.log(result);

      setTrip(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col gap-8 px-10 pt-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-3xl font-semibold">Best Deals</label>
        </div>
        <div className="grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          {trip.map((item, index) => (
            <TripCard data={item} key={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BestDeals;
