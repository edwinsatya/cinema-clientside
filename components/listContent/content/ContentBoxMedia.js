import { useState } from "react";

export default function ContentBoxMedia(props) {
  const { listSelected, onSelectedMedia, lengthContent } = props;
  const [showBlurContent, setShowBlurContent] = useState(true);

  const handleSelectedMedia = (index) => {
    onSelectedMedia(index);
    document.getElementById(`content-box-media`).scrollLeft = 0;
  };

  const handleScrollX = () => {
    const widthContent =
      document.getElementById("content-box-media").scrollWidth;
    const valScroll = document.getElementById("content-box-media").scrollLeft;
    let half;
    if (window.innerWidth >= 1440) {
      half = (widthContent * 25) / 100;
    } else if (window.innerWidth >= 768) {
      half = (widthContent * 30) / 100;
    } else {
      half = (widthContent * 35) / 100;
    }

    if (valScroll >= half) {
      if (showBlurContent) {
        setShowBlurContent(false);
      }
    } else {
      if (!showBlurContent) {
        setShowBlurContent(true);
      }
    }
  };

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
              onClick={() => handleSelectedMedia(index)}
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
      <div className="p-4 relative">
        <div
          id={`content-box-media`}
          onScroll={() => handleScrollX()}
          className={`rounded-lg flex items-stretch overflow-x-auto overflow-y-hidden`}
        >
          {props.children}
        </div>
        <div
          className={`absolute h-full ${
            showBlurContent && lengthContent > 8
              ? "w-3/12 sm:w-2/12 lg:w-1/12"
              : "w-0"
          } transform transition-all duration-300 bottom-0 right-0 bg-gradient-to-r from-transparent to-gray-100 dark:from-transparent dark:to-black`}
        ></div>
      </div>
    </div>
  );
}
