import { AxiosError } from "axios";
import axiosWithConfig from "../axiosWithConfig";
import { IResponse } from "@/utils/types/api";
import { ITransactions } from ".";

export const getTransactions = async () => {
  try {
    const res = await axiosWithConfig.get("/bookings");

    return res.data as IResponse<ITransactions[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
