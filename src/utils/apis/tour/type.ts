import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const createTourSchema = z.object({
  title: z.string({ required_error: "Enter tour title" }),
  location_id: z.string(),
  description: z.string({ required_error: "Enter tour description" }),
  price: z.string({ required_error: "Enter tour price" }),
  discount: z.string().optional(),
  admin_fee: z.string({ required_error: "Enter admin fee" }),
  start: z.date({
    required_error: "Enter tour departure date",
    invalid_type_error: "Input must be valid date",
  }),
  finish: z.date({
    required_error: "Enter tour finish date",
    invalid_type_error: "Input must be valid date",
  }),
  airline_id: z.string({ required_error: "Choose Airline" }),
  quota: z.string({ required_error: "Enter tour quota" }),
  thumbnail: z
    .any()
    .refine((file) => file?.length == 1, "File is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported",
    )
    .refine((file) => file[0]?.size <= 3000000, `Max image size is 3MB`)
    .optional()
    .or(z.literal("")),
  itinerary: z
    .object({
      location: z.string({ required_error: "Enter itinerary location" }),
      description: z.string({ required_error: "Enter itinerary description" }),
    })
    .array(),
  include_facility: z
    .string({ required_error: "Enter included facility" })
    .array(),
});

export type ICreateTour = z.infer<typeof createTourSchema>;
