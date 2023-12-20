import { AxiosError } from "axios";
import axiosWithConfig from "../axiosWithConfig";
import { IResponse } from "@/utils/types/api";
import { ILocations } from ".";

export const getLocations = async () => {
  try {
    const res = await axiosWithConfig.get("/locations");

    return res.data as IResponse<ILocations[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data.message;
    }
  }
};
