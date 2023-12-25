import { AxiosError } from "axios";
import axiosWithConfig from "../axiosWithConfig";
import { IDashboard } from ".";
import { IResponse } from "@/utils/types/api";

export const getDashboardReports = async () => {
  try {
    const res = await axiosWithConfig.get("/reports");

    return res.data as IResponse<IDashboard>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
