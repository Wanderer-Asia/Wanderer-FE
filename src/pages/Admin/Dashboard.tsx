import { Banknote, Palmtree, PlaneTakeoff, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="h-full w-full  pl-8 pr-2 pt-8">
      <p className="text-gray-main text-[24px] font-medium">Hi, Admin 👋🏼</p>
      <div className="mt-5 grid h-[155px] w-full grid-cols-4 rounded-xl bg-background shadow-lg dark:border">
        <div className="flex items-center justify-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFA3CF] p-5">
            <Users className="h-full w-full stroke-[#DA001A]" />
          </div>
          <div className="leading-6">
            <p className="text-[32px] font-semibold text-[#333333] dark:text-white">
              129
            </p>
            <p className="text-[14px] text-neutral-400">Total Wanderers</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#CAF1FF] p-5">
            <Banknote className="h-full w-full stroke-[#0F5FC2]" />
          </div>
          <div className="leading-6">
            <p className="text-[32px] font-semibold text-[#333333] dark:text-white">
              23
            </p>
            <p className="text-[14px] text-neutral-400">Transaction</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#D3FFE7] p-5">
            <Palmtree className="h-full w-full stroke-[#00AC4F]" />
          </div>
          <div className="leading-6">
            <p className="text-[32px] font-semibold text-[#333333] dark:text-white">
              14
            </p>
            <p className="text-[14px] text-neutral-400">Total Destination</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e7d3ff] p-5">
            <PlaneTakeoff className="h-full w-full stroke-[#3400ac]" />
          </div>
          <div className="leading-6">
            <p className="text-[32px] font-semibold text-[#333333] dark:text-white">
              3
            </p>
            <p className="text-[14px] text-neutral-400">Open Trip</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
