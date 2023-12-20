import { Profile } from ".";
import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/users`);

    return response.data as Response<Profile>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
