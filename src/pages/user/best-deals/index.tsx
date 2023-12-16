import Layout from "@/components/user/layout";
import TripCard from "@/components/user/trip-card";

const BestDeals = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8 px-10 pt-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-3xl font-semibold">Best Deals</label>
        </div>
        <div className="grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          <TripCard />
          <TripCard />
          <TripCard />
        </div>
      </div>
    </Layout>
  );
};

export default BestDeals;
