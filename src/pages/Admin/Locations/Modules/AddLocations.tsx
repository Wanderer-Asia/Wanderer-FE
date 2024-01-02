/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { ICreateLocation, createLocation } from "@/utils/apis/location";
import { createLocationSchema } from "@/utils/apis/location/type";
import useAdminStore from "@/utils/store/admin";
import { getLocationAdmin } from "@/utils/apis/location/api";

interface IProps {
  children: ReactNode;
}

const AddLocations = (props: IProps) => {
  const setLocationData = useAdminStore((state) => state.setLocations);
  const { children } = props;
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<ICreateLocation>({
    resolver: zodResolver(createLocationSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  const submitLocationHandler = async (values: ICreateLocation) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image[0]);

      const res = await createLocation(formData as any);
      const fetchLocation = await getLocationAdmin();

      setLocationData(fetchLocation!.data);

      toast({
        description: <p className="capitalize">{res?.message}</p>,
        title: "Success",
      });

      form.reset();
      setDialogOpen(false);
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex h-8 items-center rounded-full bg-yellow-main px-2 text-black hover:bg-tyellow w-fit">
        {children}
      </DialogTrigger>
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
                        placeholder="Location Thumbnail"
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

export default AddLocations;
