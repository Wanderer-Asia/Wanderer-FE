import { Trip } from "../trip";

export interface Location {
  location_id: number;
  name: string;
  image: string;
}

export interface LocationDetail {
  name: string;
  image: string;
  tours: Trip[];
}
