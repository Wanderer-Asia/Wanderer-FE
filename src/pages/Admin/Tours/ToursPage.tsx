import TourCard from "@/components/Admin/TourCard";

const ToursPage = () => {
  return (
    <div className="mt-5 w-full grid grid-cols-3 gap-5 mb-5">
      {Array.from({ length: 12 }, (v, k) => (
        <TourCard key={k} />
      ))}
    </div>
  );
};

export default ToursPage;
