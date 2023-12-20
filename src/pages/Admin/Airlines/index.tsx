import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useToast } from "@/components/ui/use-toast";
import { IAirlines, getAirlines } from "@/utils/apis/airlines";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Loading from "@/components/Loading";

const AirlinesPage = () => {
  const { toast } = useToast();

  const fetchAirlines = async () => {
    try {
      const res = await getAirlines();

      setAirlines(res?.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAirlines();
  }, []);

  const [airlines, setAirlines] = useState<IAirlines[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-5 w-[800px]">
          <div className="mb-5 flex gap-5">
            <p className="text-[22px] font-semibold">Airlines Info</p>
            <Button className="h-8 rounded-full bg-yellow-main px-2 text-black hover:bg-tyellow">
              <PlusCircle className="mr-2 h-4 w-4 stroke-black" /> Add Airlines
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID. </TableHead>
                <TableHead>Airlines</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {airlines?.map((airline) => (
                <TableRow key={airline.airline_id}>
                  <TableCell className="font-medium">
                    {airline.airline_id}
                  </TableCell>
                  <TableCell>{airline.name}</TableCell>
                  <TableCell>
                    <img
                      src={airline.logo}
                      alt={airline.name}
                      className="h-[80px] w-[80px]"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default AirlinesPage;
