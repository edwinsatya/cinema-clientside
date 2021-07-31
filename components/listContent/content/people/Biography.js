import { useState } from "react";

export default function Biography(props) {
  const { detailPerson } = props;
  const [showMoreBio, setShowMoreBio] = useState(false);

  return (
    <>
      <div className="font-bold text-3xl hidden lg:flex lg:mb-5">
        {detailPerson.name}
      </div>
      <h3 className="font-semibold text-lg">Biography</h3>
      <div
        className={`${!showMoreBio ? "max-h-60" : ""} relative overflow-hidden`}
      >
        <span
          style={{ whiteSpace: "pre-line" }}
          className="font-medium text-sm"
        >
          {detailPerson.biography.length > 0 ? detailPerson.biography : "-"}
        </span>
        <div
          className={`${
            !showMoreBio && detailPerson.biography.length > 700
              ? "absolute"
              : "hidden"
          } text-primary w-full right-0 text-right font-bold bottom-0 bg-gradient-to-r from-transparent via-white to-white dark:from-transparent dark:via-black dark:to-black`}
        >
          <span
            onClick={() => setShowMoreBio(true)}
            className="cursor-pointer flex justify-end items-center"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
}
