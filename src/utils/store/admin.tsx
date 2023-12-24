import { create } from "zustand";

import { newITransactions } from "../../pages/Admin/Transactions";

interface IAdminState {
  transactions: newITransactions[];

  setTransactions: (transactionsData: newITransactions[]) => void;
}

const useAdminStore = create<IAdminState>()((set) => ({
  transactions: [],

  setTransactions: (transactionData) =>
    set(() => ({ transactions: transactionData })),
}));

export default useAdminStore;
