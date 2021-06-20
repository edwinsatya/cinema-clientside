import { useState } from "react";

export default function Accordion(props) {
  //   const [show, setShow] = useState(false);

  return (
    <div className="w-full relative my-3">
      <div
        className={`rounded ${
          props.anq.show ? "rounded-b-none" : ""
        } shadow-xl py-5 px-8 flex items-center justify-between text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-black dark:text-white bg-white dark:bg-gray-900 border border-black dark:border-gray-500`}
      >
        <h2>{props.anq.ask}</h2>
        <button
          onClick={() => props.onHandleChangeShow(props.idx)}
          className="focus:outline-none"
        >
          {props.anq.show ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="h-14 w-14"
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
              className="h-14 w-14"
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
          props.anq.show ? "flex opacity-100" : "hidden opacity-0"
        } rounded-b py-5 px-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-black dark:text-white bg-white dark:bg-gray-900 border border-t-0 border-black dark:border-gray-500 transition-opacity duration-300`}
      >
        <h2>{props.anq.answer}</h2>
      </div>
    </div>
  );
}
