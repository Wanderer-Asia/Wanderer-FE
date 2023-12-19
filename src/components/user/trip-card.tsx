import { Link } from "react-router-dom";
import React from "react";
import { Trip } from "@/utils/apis/trip";

interface Props {
  data: Trip;
}

const TripCard = (props: Props) => {
  const { data } = props;
  return (
    <Link to={"/detail-trip/1"} className="mt-3 flex flex-col md:max-w-md">
      <img className="h-96" src={data.thumbnail} />
      <div className="mt-3 flex flex-row items-center gap-3 text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          className=" h-4 w-4 fill-black dark:fill-white"
        >
          <path d="M6.75 0C3.015 0 0 3.015 0 6.75C0 11.25 6.75 18 6.75 18C6.75 18 13.5 11.25 13.5 6.75C13.5 3.015 10.485 0 6.75 0ZM6.75 2.25C9.2475 2.25 11.25 4.275 11.25 6.75C11.25 9.2475 9.2475 11.25 6.75 11.25C4.275 11.25 2.25 9.2475 2.25 6.75C2.25 4.275 4.275 2.25 6.75 2.25Z" />
        </svg>
        <p>{data.location.name}</p>
        <p className=" pl-3 text-red-900">Discount {data.discount}%</p>
      </div>
      <h1 className=" mt-3 text-justify text-lg">{data.title}</h1>
      <div className="mt-3 flex flex-row gap-4 text-xs">
        <div className="flex flex-row items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            className=" h-4 w-4 fill-black dark:fill-white"
          >
            <path d="M10.3125 0C9.35625 0 8.53125 0.65625 8.025 1.65C8.86875 2.6625 9.375 4.05 9.375 5.64375C9.375 6.1875 9.31875 6.675 9.20625 7.1625C9.5625 7.36875 9.91875 7.51875 10.3125 7.51875C11.8687 7.51875 13.125 5.83125 13.125 3.76875C13.125 1.70625 11.8687 0.01875 10.3125 0.01875V0ZM4.6875 1.875C3.13125 1.875 1.875 3.5625 1.875 5.625C1.875 7.6875 3.13125 9.375 4.6875 9.375C6.24375 9.375 7.5 7.6875 7.5 5.625C7.5 3.5625 6.24375 1.875 4.6875 1.875ZM13.5938 7.8C12.7875 8.75625 11.6812 9.3375 10.425 9.375C10.9312 10.0875 11.25 10.95 11.25 11.8875V13.125H15V10.0125C15 9.0375 14.4187 8.19375 13.5938 7.78125V7.8ZM1.40625 9.675C0.58125 10.0875 0 10.9312 0 11.9062V15.0187H9.375V11.9062C9.375 10.9312 8.79375 10.0875 7.96875 9.675C7.125 10.6687 5.98125 11.25 4.6875 11.25C3.39375 11.25 2.25 10.65 1.40625 9.675Z" />
          </svg>
          <p>{data.quota} People</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            className=" h-4 w-4 fill-black dark:fill-white"
          >
            <path d="M7.5 0C3.375 0 0 3.375 0 7.5C0 11.625 3.375 15 7.5 15C11.625 15 15 11.625 15 7.5C15 3.375 11.625 0 7.5 0ZM7.5 1.875C10.6125 1.875 13.125 4.3875 13.125 7.5C13.125 10.6125 10.6125 13.125 7.5 13.125C4.3875 13.125 1.875 10.6125 1.875 7.5C1.875 4.3875 4.3875 1.875 7.5 1.875ZM6.5625 3.75V7.9125L6.8625 8.15625L7.8 9.09375L8.4375 9.80625L9.7875 8.45625L9.075 7.81875L8.4375 7.18125V3.7875H6.5625V3.75Z" />
          </svg>
          <p>13 Dec 2023</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className=" h-4 w-4 fill-black dark:fill-white"
          >
            <path d="M2.17993 8.24008L6.09993 12.0601L5.17993 17.4401L9.99993 14.9001L14.8199 17.4401L13.8999 12.0601L17.8199 8.24008L12.4199 7.46008L9.99993 2.58008L7.57993 7.46008L2.17993 8.24008Z" />
          </svg>
          <p>{data.rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default TripCard;
