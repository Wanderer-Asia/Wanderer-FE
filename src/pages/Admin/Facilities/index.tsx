import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "@/components/Loading";
import { getFacilities } from "@/utils/apis/facilities";
import { useToast } from "@/components/ui/use-toast";
import AddFacility from "./Modules/AddFacility";
import { FileDown, FileUp, PenBox, PlusCircle, Trash2 } from "lucide-react";
import DeleteFacility from "./Modules/DeleteFacility";
import EditFacility from "./Modules/EditFacility";
import useAdminStore from "@/utils/store/admin";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FacilitiesPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const facilities = useAdminStore((state) => state.facilities);
  const setFacilities = useAdminStore((state) => state.setFacilities);

  const fetchFacilities = async () => {
    try {
      const res = await getFacilities();

      setFacilities(res!.data);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: <p className="capitalize">{error.message}</p>,
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
        const res = await axiosWithConfig.post("/facilities/import", formData);

        toast({
          description: <p className="capitalize">{res.data.message}</p>,
        });

        const fetchOnChange = await getFacilities();

        setFacilities(fetchOnChange!.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFacilities();
    document.title = "Wanderer - Facilities";
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-5 w-[800px]">
          <div className="mb-5 flex gap-5">
            <p className="text-[22px] font-semibold">Facilities Info</p>
            <AddFacility>
              <PlusCircle className="mr-2 h-4 w-4 stroke-black" /> Add Facility
            </AddFacility>

            <a href="https://api.wanderer.asia/facilities/import">
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
                className="flex h-8 items-center rounded-full bg-blue-500 px-3 text-black hover:cursor-pointer hover:bg-blue-700"
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
                <TableHead>ID. </TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {facilities?.map((facility) => (
                <TableRow key={facility.facility_id}>
                  <TableCell className="font-medium">
                    {facility.facility_id}
                  </TableCell>

                  <TableCell>{facility.name}</TableCell>

                  <TableCell>
                    <div className="flex h-full w-full items-center">
                      <EditFacility
                        facility_name={facility.name}
                        id={facility.facility_id.toString()}
                      >
                        <PenBox className="mr-2 stroke-blue-400" />
                      </EditFacility>

                      <DeleteFacility
                        id={facility?.facility_id.toString()}
                        facility_name={facility?.name}
                      >
                        <Trash2 className=" stroke-red-400 hover:cursor-pointer" />
                      </DeleteFacility>
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

export default FacilitiesPage;
