import { AxiosError } from "axios";
import axiosWithConfig from "../axiosWithConfig";
import { IResponse } from "@/utils/types/api";
import { IFacilities } from ".";

export const getFacilities = async () => {
  try {
    const res = await axiosWithConfig("/facilities");

    return res.data as IResponse<IFacilities[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
