import { useEffect } from "react";

export default function ContentBox(props) {
  const { lengthContent, isBlur, onScroll, indexContent, type, detail } = props;

  const handleScrollX = () => {
    const widthContent = document.getElementById(
      `content-box-${type}-${indexContent}`
    ).scrollWidth;
    const valScroll = document.getElementById(
      `content-box-${type}-${indexContent}`
    ).scrollLeft;
    let half;
    if (window.innerWidth >= 1440) {
      half = (widthContent * 25) / 100;
    } else if (window.innerWidth >= 768) {
      half = (widthContent * 30) / 100;
    } else {
      half = (widthContent * 35) / 100;
    }

    // console.log(
    //   widthContent,
    //   "width",
    //   half,
    //   "half",
    //   valScroll,
    //   "val",
    //   document.getElementById(`content-box-${type}-${indexContent}`)
    //     .offsetWidth -
    //     document.getElementById(`content-box-${type}-${indexContent}`)
    //       .clientWidth,
    //   "bar width"
    // );

    if (valScroll >= half) {
      if (isBlur) {
        onScroll({ index: indexContent, isBlur: false, type });
      }
    } else {
      if (!isBlur) {
        onScroll({ index: indexContent, isBlur: true, type });
      }
    }
  };

  useEffect(() => {
    document.getElementById(
      `content-box-${type}-${indexContent}`
    ).scrollLeft = 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detail]);

  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-base font-semibold sm:text-lg md:text-xl">
          {props.title}
        </h3>
        <div className="ml-3">{props.icon}</div>
      </div>
      <div className="relative p-4">
        <div
          onScroll={() => handleScrollX()}
          id={`content-box-${type}-${indexContent}`}
          className={`flex items-stretch overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent`}
        >
          {props.children}
        </div>
        <div
          className={`absolute h-full ${
            isBlur && lengthContent > 8 ? "w-3/12 sm:w-2/12 lg:w-1/12" : "w-0"
          } transform transition-all duration-300 bottom-0 right-0 bg-gradient-to-r from-transparent to-gray-100 dark:from-transparent dark:to-black`}
        ></div>
      </div>
    </div>
  );
}
