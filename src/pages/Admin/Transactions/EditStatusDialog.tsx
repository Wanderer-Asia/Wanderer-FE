import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { changeBookingStatus } from "@/utils/apis/booking";
import { ITransactions } from "@/utils/apis/transactions";
import { getTransactions } from "@/utils/apis/transactions/api";
import useAdminStore from "@/utils/store/admin";
import { differenceInDays } from "date-fns";

import { Dispatch, SetStateAction, useState } from "react";

interface IProps {
  booking_code: string;
  name: string;
  tourPacakge: string;
  status: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const EditStatusDialog = (props: IProps) => {
  const { booking_code, name, tourPacakge, status, open, onOpenChange } = props;
  const [statusInput, setStatusInput] = useState(status);
  const setData = useAdminStore((state) => state.setTransactions);
  const { toast } = useToast();

  const fetchData = async () => {
    try {
      const res = await getTransactions();
      const newTransactions = res?.data.map((data: ITransactions) => {
        return {
          booking_code: data.booking_code.toString(),
          tour_package: data.tour.title,
          total: data.total,
          name: data.user.fullname,
          status: data.status,
          durations:
            differenceInDays(
              new Date(data.tour.finish),
              new Date(data.tour.start),
            ) + 1,
        };
      });

      setData(newTransactions!);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error?.message,
          variant: "destructive",
        });
      }
    }
  };

  const statusHandler = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await changeBookingStatus(booking_code, {
        status: statusInput,
      });

      toast({
        description: <p className="capitalize">{res?.message}</p>,
      });

      onOpenChange(false);
      fetchData();
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Refund Status</DialogTitle>
        </DialogHeader>
        <div>
          <p className="font-semibold">Booking Code</p>
          <p className="text-[14px] text-neutral-400">
            {booking_code} - {tourPacakge}
          </p>
          <p className="mt-2 font-semibold">Name</p>
          <p className="text-[14px] text-neutral-400">{name}</p>
        </div>

        <form onSubmit={statusHandler}>
          <Label>Change Status</Label>
          <Select
            defaultValue={status}
            onValueChange={(value) => setStatusInput(value)}
          >
            <SelectTrigger className="mb-5 mt-2 w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="refund">Refund</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-yellow-main hover:bg-tyellow">
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusDialog;
