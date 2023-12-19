export interface Trip {
  tour_id: number;
  title: string;
  quota: number;
  discount: number;
  rating: number;
  price: number;
  thumbnail: string;
  start: string;
  location: Location;
}

export interface Location {
  name: string;
}
