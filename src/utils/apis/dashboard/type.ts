export interface IDashboard {
  total_user: number;
  total_booking: number;
  total_location: number;
  total_tour: number;
  graph_booking: [
    {
      label: string;
      total: number;
    },
  ];
  recent_booking: [
    {
      booking_code: number;
      location: string;
      price: number;
    },
  ];
  top_tours: [
    {
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
    },
  ];
}
