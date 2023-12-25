import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import { useEffect } from "react";
import { getTransactions } from "@/utils/apis/transactions/api";
import { differenceInDays } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { ITransactions } from "@/utils/apis/transactions";
import useAdminStore from "@/utils/store/admin";

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

  const data = useAdminStore((state) => state.transactions);
  const setData = useAdminStore((state) => state.setTransactions);

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
  }, [data]);

  // const [data, setData] = useState<newITransactions[] | undefined>([]);

  return (
    <div className="mt-5 w-full">
      <p className="mb-5 text-[22px] font-semibold">Transaction List</p>
      <DataTable data={data as newITransactions[]} columns={Columns} />
    </div>
  );
};

export default TransactionsPage;
