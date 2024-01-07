import { AlertDialogComponent } from "@/components/user/alert-dialog";
import { BookingDetail } from "@/utils/apis/booking/type";
import ReviewCard from "@/components/user/review-card";
import ReviewDialog from "@/components/user/review-dialog";
import { TripDetail } from "@/utils/apis/trip";
import { useParams } from "react-router-dom";
import { useToken } from "@/utils/context/token";

interface Props {
  trip: TripDetail;
  bookingData?: BookingDetail;
  fetchDetailTrip: () => void;
}

const DetailTripReview = (props: Props) => {
  const { trip, bookingData, fetchDetailTrip } = props;
  const { tripId, bookingId } = useParams();
  const { user } = useToken();

  const checkAlreadyReview = () => {
    const userId = user.user_id;
    const reviews = trip.reviews;

    const alreadyReviewed = reviews.some(
      (review) => review.user.user_id === userId,
    );

    return alreadyReviewed;
  };

  return (
    <div className="mt-8 flex flex-col gap-5">
      <label className="text-xl font-semibold">Review</label>
      {bookingId &&
        bookingData?.booking_code === Number(bookingId) &&
        (trip.reviews && checkAlreadyReview() ? (
          <AlertDialogComponent
            title="You have already do a review !"
            btnText="Okay"
          />
        ) : (
          <ReviewDialog id={tripId as string} fetchTrip={fetchDetailTrip} />
        ))}

      {trip?.reviews &&
        trip?.reviews.map((item, index) => (
          <ReviewCard data={item} key={index} />
        ))}
    </div>
  );
};

export default DetailTripReview;
