import { AxiosError } from "axios";
import { BookingData } from ".";
import axiosWithConfig from "../axiosWithConfig";

export const createBooking = async (body: BookingData) => {
  try {
    const response = await axiosWithConfig.post("/bookings", body);

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
