import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  booking_code: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const EditStatusDialog = (props: IProps) => {
  const { booking_code, open, onOpenChange } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Refund Status</DialogTitle>
        </DialogHeader>
        <div>
          <p className="font-semibold">Booking Code</p>
          <p className="mt-2 text-[14px]">{booking_code}</p>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusDialog;
