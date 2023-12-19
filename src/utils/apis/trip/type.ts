export interface Trip {
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

export interface TripDetail extends Trip {
  description: string;
  admin_fee: number;
  quota: number;
  available: number;
  finish: string;
  airline: {
    name: string;
  };
  picture: string[];
  facility: Facility;
  itinerary: Itinerary[];
  reviews: Review[];
}
export interface Review {
  user: User;
  text: string;
  created_at: string;
}
interface User {
  name: string;
  image: string;
}
interface Itinerary {
  location: string;
  description: string;
}
interface Facility {
  include: string[];
  exclude: string[];
}
