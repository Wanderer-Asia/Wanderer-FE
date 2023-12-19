import { Location, LocationDetail } from ".";

import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";

export const getLocation = async (keyword?: string, limit?: number) => {
  try {
    const response = await axiosWithConfig.get(
      `/locations?keyword=${keyword}&limit=${limit}`,
    );

    return response.data as Response<Location[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailLocation = async (locationId: string) => {
  try {
    const response = await axiosWithConfig.get(`/locations/${locationId}`);

    return response.data as Response<LocationDetail>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
