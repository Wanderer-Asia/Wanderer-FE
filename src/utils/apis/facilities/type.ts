import * as z from "zod";

export interface IFacilities {
  facility_id: number;
  name: string;
}

export interface INewFacilities {
  label: string;
  value: string;
}

export const createFacilitySchema = z.object({
  name: z.string().min(1, { message: "Enter included tour facility" }),
});

export type ICreateFacility = z.infer<typeof createFacilitySchema>;
