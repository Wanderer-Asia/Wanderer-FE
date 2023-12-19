import { Response } from "@/utils/types/api";
import { Trip } from "./type";
import axiosWithConfig from "../axiosWithConfig";

export const getTrip = async (
  keyword?: string,
  page?: number,
  limit?: number,
  sort?: string,
) => {
  try {
    const response = await axiosWithConfig.get(
      `https://virtserver.swaggerhub.com/GALIHP83/Wanderer/1.0.0/tours?keyword=${keyword}start=${page}&limit=${limit}&sort=${sort}`,
    );

    return response.data as Response<Trip[]>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
