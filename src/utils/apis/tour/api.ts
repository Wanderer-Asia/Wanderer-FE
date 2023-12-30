import axiosWithConfig from "../axiosWithConfig";
import { ICreateTour, ITours, IUpdateTour } from ".";
import axios, { AxiosError } from "axios";
import { IResponse, Request, Response } from "@/utils/types/api";

export const getTours = async () => {
  try {
    const res = await axiosWithConfig.get(
      "/tours?start=0&limit=6&sort=price&dir=true&keyword=",
    );

    return res.data as Response<ITours[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const getToursAdmin = async (url?: string, params?: Request) => {
  try {
    let query = "";

    if (params) {
      const queryParams: string[] = [];

      let key: keyof typeof params;
      for (key in params) {
        queryParams.push(`&${key}=${params[key]}`);
      }

      query = queryParams.join("&");

      const API_URL = `${url}${query}`;

      const res = await axios.get(API_URL);

      return res.data as Response<ITours[]>;
    }

    if (url) {
      const res = await axios.get(url);
      return res.data as Response<ITours[]>;
    }
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

export const getTourDetail = async (id: string | undefined) => {
  try {
    const res = await axiosWithConfig.get(`/tours/${id}`);

    return res.data as IResponse<ITours>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const updateTour = async (id: string | undefined, body: IUpdateTour) => {
  try {
    const res = await axiosWithConfig.put(`/tours/${id}`, body);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
