import { BookingDetail } from "@/utils/apis/booking/type";
import ReviewCard from "@/components/user/review-card";
import ReviewDialog from "@/components/user/review-dialog";
import { TripDetail } from "@/utils/apis/trip";
import { useParams } from "react-router-dom";

interface Props {
  trip: TripDetail;
  bookingData?: BookingDetail;
  fetchDetailTrip: () => void;
}

const DetailTripReview = (props: Props) => {
  const { trip, bookingData, fetchDetailTrip } = props;
  const { tripId, bookingId } = useParams();
  return (
    <div className="mt-8 flex flex-col gap-5">
      <label className="text-xl font-semibold">Review</label>
      {bookingId && bookingData?.booking_code === Number(bookingId) && (
        <ReviewDialog id={tripId as string} fetchTrip={fetchDetailTrip} />
      )}
      {trip?.reviews &&
        trip?.reviews.map((item, index) => (
          <ReviewCard data={item} key={index} />
        ))}
    </div>
  );
};

export default DetailTripReview;
