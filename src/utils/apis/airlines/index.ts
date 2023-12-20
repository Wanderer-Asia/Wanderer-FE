import {
  IAirlines,
  ICreateAirline,
  createAirlineSchema,
  IUpdateAirline,
  updateAirlineSchema,
} from "./type";
import {
  getAirlines,
  createAirline,
  updateAirline,
  deleteAirline,
} from "./api";

export {
  getAirlines,
  createAirline,
  updateAirline,
  deleteAirline,
  createAirlineSchema,
  updateAirlineSchema,
};
export type { IAirlines, ICreateAirline, IUpdateAirline };
