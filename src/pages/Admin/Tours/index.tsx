import TourCard from "@/components/Admin/TourCard";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, PlusCircle, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITours, getToursAdmin } from "@/utils/apis/tour";
import Loading from "@/components/Loading";
import { Pagination } from "@/utils/types/api";
import { cn } from "@/utils/utils";

const ToursPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tourData, setToursData] = useState<ITours[]>();
  const [pagination, setPagination] = useState<Pagination>();
  const [tourUrl, setTourUrl] = useState<string | undefined>(
    "https://api.wanderer.asia/tours?start=0&limit=6",
  );
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Wanderer - Tours";
    const fetchTours = async () => {
      const query: { [key: string]: string } = {};
      for (const entry of searchParams.entries()) {
        query[entry[0]] = entry[1];
      }

      try {
        const res = await getToursAdmin(tourUrl, { ...query });
        setPagination(res!.pagination);
        setToursData(res!.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, [tourUrl, searchParams]);

  const sortingHandler = (value: string) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  const searchingHandler = (value: React.ChangeEvent<HTMLInputElement>) => {
    const timeOut = setTimeout(() => {
      searchParams.set("keyword", value.target.value);
      setSearchParams(searchParams);
    }, 1000);

    return timeOut;
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-5 h-full w-full">
          <div className="flex flex-col items-start gap-2 md:flex-row md:justify-between">
            <div className="flex items-center gap-7">
              <Link to={"add-tour"}>
                <Button className="h-8 rounded-full bg-yellow-main px-2 text-black hover:bg-tyellow">
                  <PlusCircle className="mr-2 h-4 w-4 stroke-black" /> Add Tour
                </Button>
              </Link>
            </div>
            <div className="flex w-full items-center gap-2 md:w-fit">
              <div className="relative flex w-full">
                <Input
                  placeholder="Search..."
                  className="w-full"
                  onChange={(value) => searchingHandler(value)}
                />
                <span className="absolute right-2 flex h-full items-center">
                  <Search className="h-4" />
                </span>
              </div>

              <Select onValueChange={(value) => sortingHandler(value)}>
                <SelectTrigger className="w-[150px] md:w-[250px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price&dir=false">Lowest Price</SelectItem>
                  <SelectItem value="price&dir=true">Highest Price</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="mt-3 text-[22px] font-semibold">Tours List</p>
          <div className="h-full w-full">
            {tourData !== null ? (
              <>
                <div className="mb-5 mt-2 grid w-full grid-cols-2 justify-items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {tourData?.map((tour) => (
                    <TourCard key={tour.tour_id} tourData={tour} />
                  ))}
                </div>
              </>
            ) : (
              <p className="mt-8 w-full text-center font-bold">No Tour Data</p>
            )}
          </div>

          <div className="mb-5 flex w-full justify-center gap-5">
            <Button
              className={cn(
                "h-9 w-10 bg-yellow-main p-2 hover:bg-tyellow disabled:bg-yellow-main/50",
              )}
              disabled={pagination?.prev === null}
              onClick={() => setTourUrl(pagination!.prev)}
            >
              <ChevronLeft className="stroke-black" />
            </Button>
            <Button
              className={cn(
                "h-9 w-10 bg-yellow-main p-2 hover:bg-tyellow disabled:bg-yellow-main/50",
              )}
              disabled={pagination?.next === null}
              onClick={() => setTourUrl(pagination!.next)}
            >
              <ChevronRight className="stroke-black" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ToursPage;
