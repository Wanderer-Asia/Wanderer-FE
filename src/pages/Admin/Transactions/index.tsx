import {
  ITransaction,
  transactionData,
} from "@/components/Admin/transactionData";
import { DataTable } from "./DataTable";
import { Columns } from "./Columns";
import { useEffect, useState } from "react";

async function getData(): Promise<ITransaction[]> {
  return transactionData;
}

const TransactionsPage = () => {
  useEffect(() => {
    const test = async () => {
      const res = await getData();
      setData(res);
    };

    test();
  }, []);

  const [data, setData] = useState<ITransaction[]>([]);

  return (
    <div className="mt-5 w-full">
      <p className="mb-5 text-[22px] font-semibold">Transaction List</p>
      <DataTable data={data} columns={Columns} />
    </div>
  );
};

export default TransactionsPage;
