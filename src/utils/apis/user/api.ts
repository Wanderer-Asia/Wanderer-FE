import { IResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { AxiosError } from "axios";
import { IEditUser } from ".";

export const updateUser = async (body: IEditUser) => {
  try {
    const res = await axiosWithConfig.patch("/users", body);

    return res?.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
