import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export interface IAirlines {
  airline_id: number;
  name: string;
  logo: string;
}

export const createAirlineSchema = z.object({
  name: z.string().min(1, { message: "Enter airline name" }),
  logo: z
    .any()
    .refine((file) => file?.length == 1, "Thumbnail is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported",
    )
    .refine((file) => file[0]?.size <= 3000000, `Max image size is 3MB`),
});

export const updateAirlineSchema = z.object({
  name: z.string().min(1, { message: "Enter airline name" }),
  logo: z
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

export type ICreateAirline = z.infer<typeof createAirlineSchema>;
export type IUpdateAirline = z.infer<typeof updateAirlineSchema>;
