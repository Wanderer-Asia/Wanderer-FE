import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { TripDetail } from "@/utils/apis/trip";
import { eachDayOfInterval, format } from "date-fns";

interface Props {
  trip: TripDetail;
}

const DetailTripItenary = (props: Props) => {
  const { trip } = props;
  const itineraryDate = eachDayOfInterval({
    start: new Date(trip.start),
    end: new Date(trip.finish),
  });

  return (
    <div className="mt-8 flex flex-col gap-5">
      <label className="text-xl font-semibold">Itinerary</label>
      {trip?.itinerary.map((item, index) => (
        <Accordion
          key={index}
          type="single"
          collapsible
          className="items-center p-5 shadow-lg md:mx-5"
        >
          <AccordionItem value="item-1" className=" border-none fill-black">
            <AccordionTrigger>
              <div className="flex flex-row items-center gap-14">
                <div className="flex flex-col text-left">
                  <h1 className="text-xl">Day {index + 1}</h1>
                  <p className="text-xs">{`${format(
                    itineraryDate[index],
                    "PP",
                  )}`}</p>
                </div>
                <h1 className="text-xl">{item.location}</h1>
              </div>
            </AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default DetailTripItenary;
