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
import { FileDown, FileUp, PenBox, PlusCircle, Trash2 } from "lucide-react";
import Loading from "@/components/Loading";
import AddLocations from "./Modules/AddLocations";
import DeleteLocations from "./Modules/DeleteLocations";
import EditLocations from "./Modules/EditLocations";
import useAdminStore from "@/utils/store/admin";
import { getLocationAdmin } from "@/utils/apis/location/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axiosWithConfig from "@/utils/apis/axiosWithConfig";

const LocationsPage = () => {
  const { toast } = useToast();
  const locations = useAdminStore((state) => state.locations);
  const setLocations = useAdminStore((state) => state.setLocations);

  const fetchLocations = async () => {
    try {
      const res = await getLocationAdmin();

      setLocations(res!.data);
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
        const res = await axiosWithConfig.post("/locations/import", formData);

        toast({
          description: <p className="capitalize">{res.data.message}</p>,
        });

        const fetchOnChange = await getLocationAdmin();

        setLocations(fetchOnChange!.data);
      }
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchLocations();
    document.title = "Wanderer - Locations";
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mt-5 w-[800px]">
          <div className="mb-5 flex gap-5">
            <p className="text-[22px] font-semibold">Locations Info</p>
            <AddLocations>
              <PlusCircle className="mr-2 h-4 w-4 stroke-black" /> Add Locations
            </AddLocations>

            <a href="https://api.wanderer.asia/locations/import">
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
                <TableHead>Locations</TableHead>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations?.map((location) => (
                <TableRow key={location.location_id}>
                  <TableCell className="font-medium">
                    {location.location_id}
                  </TableCell>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    <img
                      src={
                        location.image === "default"
                          ? "https://res.cloudinary.com/duooo0rok/image/upload/v1703601992/m3jg5jm7m1czvx0wgzsw.png"
                          : location.image
                      }
                      alt={location.name}
                      className="h-[80px] w-[80px] object-contain"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex h-full w-full items-center">
                      <EditLocations
                        location_name={location.name}
                        id={location.location_id.toString()}
                      >
                        <PenBox className="mr-2 stroke-blue-400" />
                      </EditLocations>

                      <DeleteLocations
                        id={location?.location_id.toString()}
                        location_name={location?.name}
                      >
                        <Trash2 className=" stroke-red-400 hover:cursor-pointer" />
                      </DeleteLocations>
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

export default LocationsPage;
