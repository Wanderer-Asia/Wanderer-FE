import { TripDetail } from "@/utils/apis/trip";

interface Props {
  trip: TripDetail;
}

const DetailTripInclude = (props: Props) => {
  const { trip } = props;
  return (
    <div className=" mt-8 flex flex-col gap-5 p-5 shadow-xl md:mx-5">
      <label className="text-xl font-semibold">Included/Excluded</label>
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1 flex-col">
          {trip?.facility &&
            trip?.facility.include.map((item) => (
              <div className="mt-3 flex flex-row items-center gap-3">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    className="fill-black dark:fill-white"
                  >
                    <path d="M13.065 0.677734L11.6586 2.27293L5.99236 8.43214L4.3414 6.70401L2.87389 5.10882L0 8.23274L1.46752 9.82793L4.52484 13.1512L5.93121 14.7464L7.39873 13.1512L14.5325 5.39684L16 3.80165L13.065 0.677734Z" />
                  </svg>
                </div>
                <p className=" text-sm font-normal">{item}</p>
              </div>
            ))}
        </div>
        <div className="flex-1 flex-col">
          {trip?.facility &&
            trip?.facility.exclude.map((item) => (
              <div className="mt-3 flex flex-row items-center gap-3">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="17"
                    viewBox="0 0 15 17"
                    fill="none"
                    className="fill-black dark:fill-white"
                  >
                    <path d="M2.69427 0.503662L0 3.43233L1.3758 4.92783L4.77707 8.68733L1.3758 12.3845L0 13.8177L2.69427 16.8087L4.07006 15.3132L7.52866 11.5537L10.9299 15.3132L12.2484 16.8087L15 13.8177L13.6242 12.3845L10.1656 8.68733L13.6242 4.92783L15 3.43233L12.2484 0.503662L10.9299 1.99915L7.52866 5.69634L4.07006 1.99915L2.69427 0.503662Z" />
                  </svg>
                </div>
                <p className=" text-sm font-normal">{item}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailTripInclude;
