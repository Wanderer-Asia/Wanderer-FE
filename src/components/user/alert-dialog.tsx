import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "../ui/button";

interface Props {
  title?: string;
  description?: string;
  btnText: string;
}

export const AlertDialogComponent = (props: Props) => {
  const { title, description, btnText } = props;
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <input
          placeholder="Tulis Pesan"
          className=" w-full rounded-sm bg-tblueLight p-3 outline-none placeholder:text-gray-800"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{btnText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
