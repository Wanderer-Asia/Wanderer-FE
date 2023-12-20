import { Auth, LoginSchema } from ".";

import { RegisterSchema } from "./type";
import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";

export const postLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post(`/login`, body);

    return response.data as Response<Auth>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const postRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post(`/register`, body);

    return response.data as Response;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
