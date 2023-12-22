import { AxiosError } from "axios";
import { BookingData } from ".";
import { BookingDetail } from "./type";
import { Response } from "@/utils/types/api";
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

export const getBookingDetail = async (bookingId: string) => {
  try {
    const response = await axiosWithConfig.get(`/bookings/${bookingId}`);

    return response.data as Response<BookingDetail>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const refundBooking = async (bookingId: string) => {
  try {
    const response = await axiosWithConfig.patch(`/bookings/${bookingId}`, {
      status: "refund",
    });

    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
