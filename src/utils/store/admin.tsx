import { create } from "zustand";

import { newITransactions } from "../../pages/Admin/Transactions";
import { IAirlines } from "../apis/airlines";
import { Location } from "../apis/location";
import { IFacilities } from "../apis/facilities";

interface IAdminState {
  transactions: newITransactions[];
  airlines: IAirlines[];
  locations: Location[];
  facilities: IFacilities[];

  setTransactions: (transactionsData: newITransactions[]) => void;
  setAirlines: (airlinesData: IAirlines[]) => void;
  setLocations: (locationsData: Location[]) => void;
  setFacilities: (facilitiesData: IFacilities[]) => void;
}

const useAdminStore = create<IAdminState>()((set) => ({
  transactions: [],
  airlines: [],
  locations: [],
  facilities: [],

  setTransactions: (transactionData) =>
    set(() => ({ transactions: transactionData })),
  setAirlines: (airlinesData) => set(() => ({ airlines: airlinesData })),
  setLocations: (locationData) => set(() => ({ locations: locationData })),
  setFacilities: (facilitiesData) =>
    set(() => ({ facilities: facilitiesData })),
}));

export default useAdminStore;
