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
import { PenBox, PlusCircle, Trash2 } from "lucide-react";
import Loading from "@/components/Loading";
import { getLocation } from "@/utils/apis/location";
import AddLocations from "./Modules/AddLocations";
import DeleteLocations from "./Modules/DeleteLocations";
import EditLocations from "./Modules/EditLocations";
import useAdminStore from "@/utils/store/admin";

const LocationsPage = () => {
  const { toast } = useToast();
  const locations = useAdminStore((state) => state.locations);
  const setLocations = useAdminStore((state) => state.setLocations);

  const fetchLocations = async () => {
    try {
      const res = await getLocation("");

      setLocations(res?.data);
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
    fetchLocations();
    document.title = "Wanderer - Locations";
  }, [locations]);

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
                      src={location.image}
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
