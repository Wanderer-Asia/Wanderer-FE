import * as z from "zod";

export interface ITours {
  tour_id: number;
  title: string;
  quota: number;
  discount: number;
  rating: number;
  price: number;
  thumbnail: string;
  start: string;
  location: {
    name: string;
  };
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createTourSchema = z.object({
  title: z.string().min(1, { message: "Enter tour title" }),
  location_id: z.string().min(1, { message: "Select location" }),
  description: z.string().min(1, { message: "Enter tour description" }),
  price: z.string().min(1, { message: "Enter tour price" }),
  discount: z.string().optional(),
  admin_fee: z.string().min(1, { message: "Enter admin fee" }),
  start: z.date({
    required_error: "Enter tour departure date",
    invalid_type_error: "Input must be valid date",
  }),
  finish: z.date({
    required_error: "Enter tour finish date",
    invalid_type_error: "Input must be valid date",
  }),
  airline_id: z.string().min(1, { message: "Choose airline" }),
  quota: z.string().min(1, { message: "Enter tour quota" }),
  thumbnail: z
    .any()
    .refine((file) => file?.length == 1, "Thumbnail is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported",
    )
    .refine((file) => file[0]?.size <= 3000000, `Max image size is 3MB`),
  itinerary: z
    .object({
      location: z
        .string({ required_error: "Enter itinerary location" })
        .min(1, { message: "Enter itinerary location" }),
      description: z
        .string({ required_error: "Enter itinerary description" })
        .min(1, { message: "Enter itinerary description" }),
    })
    .array(),
  include_facility: z
    .string()
    .array()
    .min(1, { message: "Enter included facility" }),
  picture: z.any().refine((file) => file?.length > 0, "Picture is required."),
});

export const updateTourSchema = z.object({
  title: z.string().min(1, { message: "Enter tour title" }),
  location_id: z.string().min(1, { message: "Select location" }),
  description: z.string().min(1, { message: "Enter tour description" }),
  price: z.string().min(1, { message: "Enter tour price" }),
  discount: z.string().optional().or(z.literal("")),
  admin_fee: z.string().min(1, { message: "Enter admin fee" }),
  start: z
    .date({
      required_error: "Enter tour departure date",
      invalid_type_error: "Input must be valid date",
    })
    .or(z.string()),
  finish: z
    .date({
      required_error: "Enter tour finish date",
      invalid_type_error: "Input must be valid date",
    })
    .or(z.string()),
  airline_id: z.string().min(1, { message: "Choose airline" }),
  quota: z.string().min(1, { message: "Enter tour quota" }),
  thumbnail: z
    .any()
    .refine((file) => file?.length == 1, "Thumbnail is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported",
    )
    .refine((file) => file[0]?.size <= 3000000, `Max image size is 3MB`)
    .optional()
    .or(z.literal("")),
  itinerary: z
    .object({
      location: z
        .string({ required_error: "Enter itinerary location" })
        .min(1, { message: "Enter itinerary location" }),
      description: z
        .string({ required_error: "Enter itinerary description" })
        .min(1, { message: "Enter itinerary description" }),
    })
    .array(),
  include_facility: z
    .string()
    .array()
    .min(1, { message: "Enter included facility" }),
  picture: z
    .any()
    .refine((file) => file?.length > 0, "Picture is required.")
    .optional()
    .or(z.literal("")),
});

export type ICreateTour = z.infer<typeof createTourSchema>;
export type IUpdateTour = z.infer<typeof updateTourSchema>;
