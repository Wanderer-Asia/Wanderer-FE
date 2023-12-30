/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import { useEffect } from "react";
import { getTransactions } from "@/utils/apis/transactions/api";
import { differenceInDays } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { ITransactions } from "@/utils/apis/transactions";
import useAdminStore from "@/utils/store/admin";
import { Button } from "@/components/ui/button";
import { useToken } from "@/utils/context/token";
import axios from "axios";
import { FileDown } from "lucide-react";

export interface newITransactions {
  booking_code: string;
  name: string;
  tour_package: string;
  durations: number;
  total: number;
  status: string;
}

const TransactionsPage = () => {
  const { toast } = useToast();
  const { token } = useToken();

  const data = useAdminStore((state) => state.transactions);
  const setData = useAdminStore((state) => state.setTransactions);

  const downloadFile = async () => {
    try {
      await axios
        .get("https://api.wanderer.asia/bookings/export?type=excel", {
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${Date.now()}.xlsx`);
          document.body.appendChild(link);
          link.click();
        });
    } catch (error: any) {
      toast({
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    document.title = "Wanderer - Transactions";
    const fetchData = async () => {
      try {
        const res = await getTransactions();
        if (res?.data !== null) {
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
        } else {
          toast({
            description: <p>No Transactions Data</p>,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast({
            description: error?.message,
            variant: "destructive",
          });
        }
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-5 w-full">
      <div className="flex w-full gap-5">
        <p className="mb-5 text-[22px] font-semibold">Transaction List</p>
        <Button
          size="sm"
          onClick={downloadFile}
          className="h-8 rounded-full bg-yellow-main hover:bg-tyellow"
        >
          <FileDown className="h-4" />
          Import
        </Button>
      </div>
      <DataTable data={data as newITransactions[]} columns={Columns} />
    </div>
  );
};

export default TransactionsPage;
