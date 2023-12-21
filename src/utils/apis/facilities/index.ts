import {
  IFacilities,
  INewFacilities,
  ICreateFacility,
  createFacilitySchema,
} from "./type";
import {
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
} from "./api";

export {
  createFacilitySchema,
  getFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
};
export type { IFacilities, INewFacilities, ICreateFacility };
