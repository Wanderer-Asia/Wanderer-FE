import { ReviewSchema } from ".";
import axiosWithConfig from "../axiosWithConfig";

export const postReview = async (body: ReviewSchema) => {
  try {
    const response = await axiosWithConfig.post(`/reviews`, body);

    return response.data;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
