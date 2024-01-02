/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { getAirlines } from "@/utils/apis/airlines";
import { FileDown, FileUp, PenBox, PlusCircle, Trash2 } from "lucide-react";
import Loading from "@/components/Loading";
import AddAirlines from "./Modules/AddAirlines";
import DeleteAirlines from "./Modules/DeleteAirlines";
import EditAirlines from "./Modules/EditAirlines";
import useAdminStore from "@/utils/store/admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";

const AirlinesPage = () => {
  const airlineData = useAdminStore((state) => state.airlines);
  const setAirlineData = useAdminStore((state) => state.setAirlines);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAirlines = async () => {
    try {
      const res = await getAirlines();

      setAirlineData(res!.data);
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

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files) {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        const res = await axiosWithConfig.post("/airlines/import", formData);

        toast({
          description: <p className="capitalize">{res.data.message}</p>,
        });

        const fetchOnChange = await getAirlines();

        setAirlineData(fetchOnChange!.data);
      }
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAirlines();
    document.title = "Wanderer - Airlines";
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-5 w-full lg:w-[800px]">
          <div className="mb-5 flex flex-col gap-5 md:flex-row">
            <p className="text-[22px] font-semibold">Airlines Info</p>
            <AddAirlines>
              <PlusCircle className="mr-2 h-4 w-4 stroke-black" /> Add Airlines
            </AddAirlines>
            <a href="https://api.wanderer.asia/airlines/import">
              <Button
                size={"sm"}
                className="h-8 rounded-full bg-green-400 hover:bg-green-600"
              >
                <FileDown className="mr-1 h-4" />
                Download Template
              </Button>
            </a>
            <form>
              <Label
                htmlFor="uploadFile"
                className="flex h-8 items-center rounded-full bg-blue-500 px-3 text-black hover:cursor-pointer hover:bg-blue-700 w-fit"
              >
                <FileUp className="mr-1 h-4" />
                Import
              </Label>
              <Input
                id="uploadFile"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="hidden"
                onChange={uploadFile}
              />
            </form>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. </TableHead>
                <TableHead>Airlines</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {airlineData?.map((airline, index) => (
                <TableRow key={airline.airline_id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
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
