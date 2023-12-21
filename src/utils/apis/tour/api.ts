import axiosWithConfig from "../axiosWithConfig";
import { ICreateTour, ITours } from ".";
import { AxiosError } from "axios";
import { IResponse, Response } from "@/utils/types/api";

export const getTours = async () => {
  try {
    const res = await axiosWithConfig.get("/tours");

    return res.data as Response<ITours[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const createTour = async (body: ICreateTour) => {
  try {
    const res = await axiosWithConfig.post("/tours", body);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
