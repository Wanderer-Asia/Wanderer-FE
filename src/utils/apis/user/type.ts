import * as z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const editUserSchema = z.object({
  fullname: z.string().min(1, { message: "Enter fullname" }),
  phone: z.string().min(1, { message: "Enter phone number" }),
  email: z
    .string()
    .min(1, { message: "Enter email" })
    .email({ message: "Enter a valid email" }),
  password: z.string().min(1, { message: "Enter password" }).optional().or(z.literal("")),
  image: z
    .any()
    .refine((file) => file?.length == 1, "Profile picture is required.")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported",
    )
    .refine((file) => file[0]?.size <= 3000000, `Max image size is 3MB`)
    .optional()
    .or(z.literal("")),
});

export type IEditUser = z.infer<typeof editUserSchema>;
