import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { deleteFacility, getFacilities } from "@/utils/apis/facilities";
import useAdminStore from "@/utils/store/admin";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  facility_name: string;
  id: string;
}

const DeleteFacility = (props: IProps) => {
  const { id, facility_name, children } = props;
  const { toast } = useToast();
  const setFacilities = useAdminStore((state) => state.setFacilities);

  const deleteFaciltyHandler = async () => {
    try {
      const res = await deleteFacility(id);
      const fetchFacilities = await getFacilities();

      setFacilities(fetchFacilities!.data);

      toast({
        title: "Success",
        description: <p className="capitalize">{res?.message}</p>,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: <p className="capitalize">{error.message}</p>,
        });
      }
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-medium text-red-500">{facility_name}</span>{" "}
            and remove{" "}
            <span className="font-medium text-red-500">{facility_name}</span>{" "}
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteFaciltyHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteFacility;
