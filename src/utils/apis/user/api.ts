import { IResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { AxiosError } from "axios";

export const updateUser = async () => {
  try {
    const res = await axiosWithConfig.patch("/users");

    return res?.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
