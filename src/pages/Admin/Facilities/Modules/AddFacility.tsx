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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ICreateFacility,
  createFacility,
  createFacilitySchema,
  getFacilities,
} from "@/utils/apis/facilities";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useAdminStore from "@/utils/store/admin";

interface IProps {
  children: ReactNode;
}

const AddFacility = (props: IProps) => {
  const { children } = props;
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const setFacilities = useAdminStore((state) => state.setFacilities);

  const form = useForm<ICreateFacility>({
    resolver: zodResolver(createFacilitySchema),
    defaultValues: {
      name: "",
    },
  });

  const submitFaciltyHandler = async (values: ICreateFacility) => {
    try {
      const res = await createFacility(values);
      const fetchFacilities = await getFacilities();

      setFacilities(fetchFacilities!.data);

      toast({
        title: "Success",
        description: <p className="capitalize">{res?.message}</p>,
      });

      setDialogOpen(false);
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="flex h-8 items-center rounded-full bg-yellow-main px-2 text-black hover:bg-tyellow">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Airlines</DialogTitle>
        </DialogHeader>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitFaciltyHandler)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Included Facility</FormLabel>
                    <FormControl>
                      <Input placeholder="Included Facility" {...field} />
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

export default AddFacility;
