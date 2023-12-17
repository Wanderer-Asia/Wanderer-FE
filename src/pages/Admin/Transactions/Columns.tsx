import { Badge } from "@/components/ui/badge";

import { ITransaction, statuses } from "@/components/Admin/transactionData";
import { DataTableColumnHeader } from "./DataTableColumnHeaders";
import { ColumnDef } from "@tanstack/react-table";
import DropDownActions from "./DropdownActions";

export const Columns: ColumnDef<ITransaction>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "bookingCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Code" />
    ),
  },
  {
    accessorKey: "touristName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "tourPackage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tour Package" />
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      if (status.value === "approved") {
        return (
          <Badge className="flex w-fit items-center bg-green-500 hover:cursor-default">
            <status.icon className="mr-2 h-4 w-4" />
            <p className="capitalize text-white">{status.label}</p>
          </Badge>
        );
      }

      if (status.value === "canceled") {
        return (
          <Badge className="flex w-fit items-center bg-gray-500 hover:cursor-default">
            <status.icon className="mr-2 h-4 w-4" />
            <p className="capitalize text-white">{status.label}</p>
          </Badge>
        );
      }

      if (status.value === "pending") {
        return (
          <Badge className="flex w-fit items-center bg-blue-400 hover:cursor-default">
            <status.icon className="mr-2 h-4 w-4" />
            <p className="capitalize text-white">{status.label}</p>
          </Badge>
        );
      }

      if (status.value === "refund") {
        return (
          <Badge className="flex w-fit items-center bg-red-400 hover:cursor-default">
            <status.icon className="mr-2 h-4 w-4" />
            <p className="capitalize text-white">{status.label}</p>
          </Badge>
        );
      }

      if (status.value === "refunded") {
        return (
          <Badge
            variant={"destructive"}
            className="flex w-fit items-center hover:cursor-default"
          >
            <status.icon className="mr-2 h-4 w-4" />
            <p className="capitalize text-white">{status.label}</p>
          </Badge>
        );
      }
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const transaction = row.original;

      if (transaction.status === "refund") {
        return <DropDownActions bookingCode={transaction.bookingCode} />;
      }
    },
  },
];