import { IResponse } from "@/utils/types/types";
import axiosWithConfig from "../axiosWithConfig";
import { ITours } from ".";
import { AxiosError } from "axios";

export const getTours = async () => {
  try {
    const res = await axiosWithConfig.get(
      "/tours?start=0&limit=0&sort=price&dir=false",
    );

    return res.data as IResponse<ITours[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
