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
import { useToast } from "@/components/ui/use-toast";
import {
  ICreateFacility,
  createFacilitySchema,
  updateFacility,
} from "@/utils/apis/facilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

interface IProps {
  children: ReactNode;
  facility_name: string;
  id: string;
}

const EditFacility = (props: IProps) => {
  const { id, facility_name, children } = props;
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ICreateFacility>({
    resolver: zodResolver(createFacilitySchema),
    defaultValues: {
      name: facility_name,
    },
  });

  const submitFaciltyHandler = async (values: ICreateFacility) => {
    try {
      const res = await updateFacility(id, values);

      toast({
        title: "Success",
        description: <p className="capitalize">{res?.message}</p>,
      });

      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
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

export default EditFacility;
