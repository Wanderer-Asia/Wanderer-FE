import { ICreateLocation, IUpdateLocation, Location, LocationDetail } from ".";

import { IResponse, Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { AxiosError } from "axios";

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

export const createLocation = async (body: ICreateLocation) => {
  try {
    const res = await axiosWithConfig.post("/locations", body);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const updateLocation = async (id: string, body: IUpdateLocation) => {
  try {
    // const formData = new FormData();
    // let key: keyof typeof body;
    // for (key in body) {
    //   if (body[key]) {
    //     formData.append(key, body[key]);
    //   }
    // }
    const res = await axiosWithConfig.put(`/locations/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const deleteLocation = async (id: string) => {
  try {
    const res = await axiosWithConfig.delete(`locations/${id}`);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
