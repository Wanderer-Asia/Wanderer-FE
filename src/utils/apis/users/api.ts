import { EditUserSchema, Profile } from ".";

import { Response } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get(`/users`);

    return response.data as Response<Profile>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const putProfile = async (body: EditUserSchema) => {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append("fullname", body.fullname);
    bodyFormData.append("email", body.email);
    bodyFormData.append("image", body.image[0]);
    if (body.password) {
      bodyFormData.append("password", body.password);
    }
    bodyFormData.append("phone", body.phone);
    const response = await axiosWithConfig.patch(`/users`, bodyFormData);

    return response.data as Response<Profile>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
