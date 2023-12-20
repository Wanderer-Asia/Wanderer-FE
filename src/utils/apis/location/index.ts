import {
  Location,
  LocationDetail,
  ICreateLocation,
  IUpdateLocation,
} from "./type";

import {
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} from "./api";

export { getLocation, createLocation, updateLocation, deleteLocation };
export type { Location, LocationDetail, ICreateLocation, IUpdateLocation };
