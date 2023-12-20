import * as z from "zod";
import { Trip } from "../trip";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

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

export const createLocationSchema = z.object({
  name: z.string().min(1, { message: "Enter locations name" }),
  image: z
    .any()
    .refine((file) => file?.length == 1, "Thumbnail is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported",
    )
    .refine((file) => file[0]?.size <= 3000000, `Max image size is 3MB`),
});

export const updateLocationSchema = z.object({
  name: z.string().min(1, { message: "Enter locations name" }),
  image: z
    .any()
    .refine((file) => file?.length == 1, "Thumbnail is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported",
    )
    .refine((file) => file[0]?.size <= 3000000, `Max image size is 3MB`)
    .optional()
    .or(z.literal("")),
});

export type ICreateLocation = z.infer<typeof createLocationSchema>;
export type IUpdateLocation = z.infer<typeof updateLocationSchema>;
