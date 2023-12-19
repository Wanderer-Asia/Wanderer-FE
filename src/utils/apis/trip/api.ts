import { Trip, TripDetail } from "./type";

import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";

export const getTrip = async (
  keyword?: string,
  page?: number,
  limit?: number,
  sort?: string,
) => {
  try {
    const response = await axiosWithConfig.get(
      `/tours?keyword=${keyword}start=${page}&limit=${limit}&sort=${sort}`,
    );

    return response.data as Response<Trip[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getTripDetail = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/tours/${id}`);

    return response.data as Response<TripDetail>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
