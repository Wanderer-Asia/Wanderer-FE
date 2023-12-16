import { Link } from "react-router-dom";

const DestinationCard = () => {
  return (
    <Link
      to={`/destination/japan`}
      className="flex flex-col items-center gap-2 md:max-w-[14rem]"
    >
      <label className="font-semibold">Japan</label>
      <img
        className="h-56"
        src="https://s3-alpha-sig.figma.com/img/96ea/a1ec/ca2b937bc106beac8fec486ca138b595?Expires=1703462400&Signature=HyWIs5rVcGjNwwb7N22nYJBCBG3tCmay-IsZ~VndbrXPB8stf-qHRUpyI6WHf0Qc9PDsZ4yfRL4KJacnCcH4yobCuIDaX3yDIkhdW0kPihvH-frMbsxBUvVgZD~e7hjc2iYIRf4SJjT4DMzQi2xFJvvO-6viMY5x-Q~x8dnO5XF89giEuKfxWNbIIGgoIMgGmRc5PT1LOG5JkAyOW1xni2cC45G6ywTDdl9lMreY4Ve4w1Ry8PR1on-cjQqBpzxmeHDhSYAdXCm0OMrnBcptewOlVf20mECr5~FC2Y0UbGhTn0Fp1P2QPfEng69UNZlBffHSQJQwxbX0sD0PjGiytA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
      />
    </Link>
  );
};

export default DestinationCard;
