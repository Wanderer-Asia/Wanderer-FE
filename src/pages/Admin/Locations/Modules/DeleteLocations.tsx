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
import { deleteLocation } from "@/utils/apis/location";
import { ReactNode } from "react";

interface IProps {
  id: string;
  location_name: string;
  children: ReactNode;
}

const DeleteLocations = (props: IProps) => {
  const { id, location_name, children } = props;
  const { toast } = useToast();

  const deleteLocationHandler = async () => {
    try {
      const res = await deleteLocation(id);

      toast({
        description: <p className="capitalize">{res?.message}</p>,
        title: "Success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
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
            <span className="font-medium text-red-500">{location_name}</span>{" "}
            and remove{" "}
            <span className="font-medium text-red-500">{location_name}</span>{" "}
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteLocationHandler}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLocations;
