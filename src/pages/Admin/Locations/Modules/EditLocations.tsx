/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  IUpdateLocation,
  getLocation,
  updateLocation,
} from "@/utils/apis/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLocationSchema } from "@/utils/apis/location/type";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import useAdminStore from "@/utils/store/admin";

interface IProps {
  children: ReactNode;
  location_name: string;
  id: string;
}

const EditLocations = (props: IProps) => {
  const { children, location_name, id } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const setLocationsData = useAdminStore((state) => state.setLocations);

  const form = useForm<IUpdateLocation>({
    resolver: zodResolver(updateLocationSchema),
    defaultValues: {
      name: location_name,
      image: "",
    },
  });

  const submitLocationHandler = async (values: IUpdateLocation) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image[0]);
      const res = await updateLocation(id, formData as any);
      const fetchLocationsData = await getLocation();

      setLocationsData(fetchLocationsData.data);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Airlines</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitLocationHandler)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Location Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Location Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem className="mb-5">
                    <FormLabel>Location Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Airline Name"
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        {...form.register("image")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="min-w-[150px] bg-yellow-main text-black hover:bg-tyellow"
                type="submit"
                disabled={form.formState.isSubmitting}
                aria-disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditLocations;
