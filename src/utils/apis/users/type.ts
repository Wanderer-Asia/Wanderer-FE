export interface Profile {
  user_id: number;
  fullname: string;
  email: string;
  image: string;
  tour_count: number;
  review_count: number;
  bookings: Booking[];
}
interface Booking {
  booking_code: number;
  detail_count: number;
  status: string;
  tour: Tour;
}
interface Tour {
  tour_id: number;
  title: string;
  status: number;
}
