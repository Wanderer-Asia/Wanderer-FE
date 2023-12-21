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
import { PenBox, PlusCircle, Trash2 } from "lucide-react";
import Loading from "@/components/Loading";
import AddAirlines from "./Modules/AddAirlines";
import DeleteAirlines from "./Modules/DeleteAirlines";
import EditAirlines from "./Modules/EditAirlines";

const AirlinesPage = () => {
  const [airlines, setAirlines] = useState<IAirlines[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-5 w-[800px]">
          <div className="mb-5 flex gap-5">
            <p className="text-[22px] font-semibold">Airlines Info</p>
            <AddAirlines>
              <PlusCircle className="mr-2 h-4 w-4 stroke-black" /> Add Airlines
            </AddAirlines>
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
                      className="h-[80px] w-[80px] object-contain"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex h-full w-full items-center">
                      <EditAirlines
                        airlane_name={airline.name}
                        id={airline.airline_id.toString()}
                      >
                        <PenBox className="mr-2 stroke-blue-400" />
                      </EditAirlines>

                      <DeleteAirlines
                        id={airline?.airline_id.toString()}
                        airlane_name={airline?.name}
                      >
                        <Trash2 className=" stroke-red-400 hover:cursor-pointer" />
                      </DeleteAirlines>
                    </div>
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
