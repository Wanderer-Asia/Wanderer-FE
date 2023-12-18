import TourCard from "@/components/Admin/TourCard";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { ChevronDown, PlusCircle, Search } from "lucide-react";
import DropdownSortTours from "./DropdownSortTours";
import { Link } from "react-router-dom";

const ToursPage = () => {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Link to={'add-tour'}>
            <Button className="h-8 rounded-full bg-yellow-main px-2 text-black hover:bg-tyellow">
              <PlusCircle className="mr-2 h-4 w-4 stroke-black" /> Add Tour
            </Button>
          </Link>
        </div>
        <div className="relative flex">
          <Input placeholder="Search..." className="h-9 w-[250px]" type="number" />
          <span className="absolute right-2 flex h-full items-center">
            <Search className="h-4" />
          </span>
        </div>

        <DropdownSortTours>
          <Button className="h-8 p-2" variant="outline">
            Sort by
            <ChevronDown className="ml-1 h-4" />
          </Button>
        </DropdownSortTours>
      </div>

      <p className="mt-3 text-[22px] font-semibold">Tours List</p>
      <div className="mb-5 mt-2 grid w-full grid-cols-3 gap-5">
        {Array.from({ length: 12 }, (v, k) => (
          <TourCard key={k} />
        ))}
      </div>
    </div>
  );
};

export default ToursPage;
