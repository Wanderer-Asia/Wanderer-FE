import { IResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IAirlines } from ".";
import { AxiosError } from "axios";

export const getAirlines = async () => {
  try {
    const res = await axiosWithConfig.get("/airlines");

    return res.data as IResponse<IAirlines[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
