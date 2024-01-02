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

import {
  ICreateAirline,
  createAirline,
  createAirlineSchema,
  getAirlines,
} from "@/utils/apis/airlines";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import useAdminStore from "@/utils/store/admin";

interface IProps {
  children: ReactNode;
}

const AddAirlines = (props: IProps) => {
  const setAirlinesData = useAdminStore((state) => state.setAirlines);
  const { children } = props;
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<ICreateAirline>({
    resolver: zodResolver(createAirlineSchema),
    defaultValues: {
      name: "",
      logo: "",
    },
  });

  const submitAirlineHandler = async (values: ICreateAirline) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("logo", values.logo[0]);

      const res = await createAirline(formData as any);
      const fetchData = await getAirlines();
      setAirlinesData(fetchData!.data);

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
            <form onSubmit={form.handleSubmit(submitAirlineHandler)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>Airline Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Airline Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem className="mb-5">
                    <FormLabel>Airline Logo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Airline Logo"
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        {...form.register("logo")}
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

export default AddAirlines;
