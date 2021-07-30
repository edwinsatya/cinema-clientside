import { useState } from "react";
import cardStyle from "../../../styles/card.module.css";

export default function ContentBoxMedia(props) {
  const { listSelected, onSelectedMedia } = props;

  return (
    <div className="mt-3">
      <div className="flex">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
          {props.title}
        </h3>
        <div className="flex flex-col ml-auto md:ml-12 md:flex-row md:items-center text-base font-medium">
          {listSelected.map((media, index) => (
            <div
              key={index}
              onClick={() => onSelectedMedia(index)}
              className={`cursor-pointer md:mx-2 ${
                media.isActive
                  ? "border-b-4 border-primary"
                  : "md:border-b-4 md:border-transparent"
              }`}
            >
              <span>{media.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-10">
        <div
          className={`${cardStyle.cardWrapper} rounded-lg flex items-stretch overflow-x-auto overflow-y-hidden`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
