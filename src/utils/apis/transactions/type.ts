export interface ITransactions {
  booking_code: number;
  user: {
    fullname: string;
  };
  tour: {
    title: string;
    start: string;
    finish: string;
  };
  total: number;
  status: string;
}
