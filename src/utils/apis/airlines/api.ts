import { IResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IAirlines, ICreateAirline, IUpdateAirline } from ".";
import { AxiosError } from "axios";

export const getAirlines = async () => {
  try {
    const res = await axiosWithConfig.get("/airlines");

    return res.data as IResponse<IAirlines[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const createAirline = async (body: ICreateAirline) => {
  try {
    const res = await axiosWithConfig.post("/airlines", body);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const updateAirline = async (id: string, body: IUpdateAirline) => {
  try {
    const res = await axiosWithConfig.put(`/airlines/${id}`, body);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const deleteAirline = async (id: string) => {
  try {
    const res = await axiosWithConfig.delete(`/airlines/${id}`);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
