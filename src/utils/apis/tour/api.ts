import axiosWithConfig from "../axiosWithConfig";
import { ITours } from ".";
import { AxiosError } from "axios";
import { Response } from "@/utils/types/api";

export const getTours = async () => {
  try {
    const res = await axiosWithConfig.get(
      "/tours?start=0&limit=0&sort=price&dir=false",
    );

    return res.data as Response<ITours[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
