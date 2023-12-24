import { Badge } from "@/components/ui/badge";

import { DataTableColumnHeader } from "./DataTableColumnHeaders";
import { ColumnDef } from "@tanstack/react-table";
import DropDownActions from "./DropdownActions";
import { statuses } from "@/utils/constants";
import { newITransactions } from ".";

export const Columns: ColumnDef<newITransactions>[] = [
  {
    id: "no",
    header: "No.",
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "booking_code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking Code" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "tour_package",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tour Package" />
    ),
  },
  {
    accessorKey: "durations",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Durations" />
    ),
    cell: ({ row }) => {
      return (
        <p className="text-center">
          {row.getValue("durations")} Days{" "}
          {parseInt(row.getValue("durations")) - 1} Night
        </p>
      );
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <p>
          Rp. {new Intl.NumberFormat("id-ID").format(row.getValue("total"))}
        </p>
      );
    },
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
      
      return (
        <DropDownActions
          booking_code={transaction.booking_code}
          name={transaction.name}
          tourPackage={transaction.tour_package}
          status={transaction.status}
        />
      );
      // if (transaction.status === "refund" || transaction.status === 'refunded') {
      // }
    },
  },
];
