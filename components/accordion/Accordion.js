import { useState } from "react";

export default function Accordion(props) {
  //   const [show, setShow] = useState(false);

  return (
    <div className="w-full relative my-3">
      <div
        onClick={() => props.onHandleChangeShow(props.idx)}
        className={`rounded ${
          props.anq.show ? "rounded-b-none" : ""
        } cursor-pointer shadow-xl py-2 px-6 flex items-center justify-between text-md sm:text-lg md:text-xl lg:text-2xl font-normal text-black dark:text-white bg-white dark:bg-gray-900 border ${
          props.anq.show ? "border-b-3" : ""
        } border-black dark:border-gray-500`}
      >
        <h2>{props.anq.ask}</h2>
        <button className="focus:outline-none">
          {props.anq.show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="h-12 w-12"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="h-12 w-12"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
          )}
        </button>
      </div>
      <div
        className={`${
          props.anq.show
            ? "flex opacity-100 py-5 px-8"
            : "visible opacity-0 p-0"
        } rounded-b text-md sm:text-lg md:text-xl lg:text-2xl font-normal text-black dark:text-white bg-white dark:bg-gray-900 border border-t-0 border-black dark:border-gray-500 transition-all duration-200`}
      >
        <h2 className={`${!props.anq.show ? "h-0" : ""}`}>
          {props.anq.answer}
        </h2>
      </div>
    </div>
  );
}
