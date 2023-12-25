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
  IUpdateAirline,
  getAirlines,
  updateAirline,
  updateAirlineSchema,
} from "@/utils/apis/airlines";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import useAdminStore from "@/utils/store/admin";

interface IProps {
  children: ReactNode;
  airlane_name: string;
  id: string;
}

const EditAirlines = (props: IProps) => {
  const setAirlineData = useAdminStore((state) => state.setAirlines);
  const { children, airlane_name, id } = props;
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<IUpdateAirline>({
    resolver: zodResolver(updateAirlineSchema),
    defaultValues: {
      name: airlane_name,
      logo: "",
    },
  });

  const submitAirlineHandler = async (values: IUpdateAirline) => {
    try {
      const res = await updateAirline(id, values);
      const fetchAirline = await getAirlines();

      setAirlineData(fetchAirline!.data);

      toast({
        title: "Success",
        description: <p className="capitalize">{res?.message}</p>,
      });
      form.reset();
      setIsOpen(false);
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
                    <FormLabel>Airline Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Airline Name"
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

export default EditAirlines;
