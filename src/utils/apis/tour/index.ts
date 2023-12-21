import {
  createTourSchema,
  updateTourSchema,
  ICreateTour,
  ITours,
  IUpdateTour,
} from "./type";
import { getTourDetail, createTour, updateTour } from "./api";

export {
  createTourSchema,
  createTour,
  updateTourSchema,
  getTourDetail,
  updateTour,
};
export type { ICreateTour, ITours, IUpdateTour };
