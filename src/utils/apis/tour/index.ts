import {
  createTourSchema,
  updateTourSchema,
  ICreateTour,
  ITours,
  IUpdateTour,
} from "./type";
import { getTourDetail, createTour, updateTour, getToursAdmin } from "./api";

export {
  createTourSchema,
  createTour,
  updateTourSchema,
  getToursAdmin,
  getTourDetail,
  updateTour,
};
export type { ICreateTour, ITours, IUpdateTour };
