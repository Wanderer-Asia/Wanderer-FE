import { AxiosError } from "axios";
import axiosWithConfig from "../axiosWithConfig";
import { IResponse } from "@/utils/types/api";
import { ICreateFacility, IFacilities } from ".";

export const getFacilities = async () => {
  try {
    const res = await axiosWithConfig.get("/facilities");

    return res.data as IResponse<IFacilities[]>;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const createFacility = async (body: ICreateFacility) => {
  try {
    const res = await axiosWithConfig.post("/facilities", body);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const updateFacility = async (id: string, body: ICreateFacility) => {
  try {
    const res = await axiosWithConfig.put(`/facilities/${id}`, body);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};

export const deleteFacility = async (id: string) => {
  try {
    const res = await axiosWithConfig.delete(`/facilities/${id}`);

    return res.data as IResponse;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw Error(error.response?.data.message);
    }
  }
};
