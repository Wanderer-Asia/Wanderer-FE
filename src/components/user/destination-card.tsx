import { Link } from "react-router-dom";
import { Location } from "@/utils/apis/location";

interface Props {
  data: Location;
}

const DestinationCard = (props: Props) => {
  const { data } = props;
  return (
    <Link
      to={`/destination/${data.location_id}`}
      className="flex flex-col items-center gap-2 md:max-w-[14rem]"
    >
      <label className="font-semibold">{data.name}</label>
      <img className="h-56" src={data.image} />
    </Link>
  );
};

export default DestinationCard;
