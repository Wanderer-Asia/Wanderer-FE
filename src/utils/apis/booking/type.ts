import * as z from "zod";

import { Trip } from "@/utils/apis/trip";

const paymentMethods = ["BCA", "Method 2", "Method 3"] as const;
export const bookingSchema = z.object({
  tour_id: z.number(),
  payment_method: z.enum(paymentMethods),
  details: z.array(
    z.object({
      document_number: z.string(),
      greeting: z.string().min(1),
      name: z.string().min(1),
      nationality: z.string().min(1),
      dob: z.string().min(1),
    }),
  ),
});

export type BookingSchema = z.infer<typeof bookingSchema>;

export interface BookingData {
  tour_id: number;
  payment_method: string;
  detail: Persons[];
}
export interface Persons {
  document_number: string;
  greeting: string;
  name: string;
  nationality: string;
  dob: string;
}

export interface BookingDetail {
  booking_code: number;
  detail_count: number;
  status: string;
  total: number;
  payment_method: string;
  virtual_number: string;
  payment_expired: string;
  code_bill: string;
  key_bill: string;
  tour: Trip;
}
