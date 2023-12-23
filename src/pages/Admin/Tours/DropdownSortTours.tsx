import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode, useState } from "react";

interface IProps {
  children: ReactNode;
}

const DropdownSortTours = (props: IProps) => {
  const { children } = props;
  const [sortBy, setSortBy] = useState("price");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem value="price">Price</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="rating">Rating</DropdownMenuRadioItem>

        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownSortTours;
