import * as z from "zod";

export const reviewSchema = z.object({
  tour_id: z.number(),
  text: z.string().min(1, { message: "Comment is required" }),
  rating: z.number().min(1, { message: "rating is required" }),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
