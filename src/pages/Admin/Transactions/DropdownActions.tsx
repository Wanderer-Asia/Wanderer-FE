import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import EditStatusDialog from "./EditStatusDialog";

interface IProps {
  booking_code: string;
}

const DropDownActions = (props: IProps) => {
  const { booking_code } = props;
  const [editDialogiOpen, setEditDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-full w-full p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            Edit Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditStatusDialog
        booking_code={booking_code}
        open={editDialogiOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
};

export default DropDownActions;
