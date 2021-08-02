import CardPersonKnownFor from "../../card/CardPersonKnownFor";
import CardNoTrailer from "../../card/CardNoTrailer";
import { useRouter } from "next/router";
import { useState } from "react";

export default function KnownFor(props) {
  const { detailPerson } = props;
  const router = useRouter();
  const [showBlurContent, setShowBlurContent] = useState(true);

  const goDetailMedia = (e) => {
    if (e.media_type === "movie") {
      router.push(`/movies/${e.id}`);
    } else if (e.media_type === "tv") {
      router.push(`/tv-shows/${e.id}`);
    }
  };

  const handleScrollX = () => {
    const widthContent = document.getElementById("content-box").scrollWidth;
    const valScroll = document.getElementById("content-box").scrollLeft;
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
    <div className="px-5 lg:px-0 mt-3">
      <div className="flex items-center">
        <h3 className="text-base sm:text-lg font-semibold">Known For</h3>
      </div>
      <div className="relative">
        <div
          onScroll={() => handleScrollX()}
          id="content-box"
          className={`flex items-stretch overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-rounded-lg scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-900 scrollbar-track-transparent`}
        >
          {detailPerson.known_for.length > 0 ? (
            detailPerson.known_for.map((known, index) => {
              return (
                <CardPersonKnownFor
                  key={index}
                  dataContent={known}
                  onHandleClick={(e) => goDetailMedia(e)}
                  indexContent={index}
                />
              );
            })
          ) : (
            <CardNoTrailer title="No Have Known For" />
          )}
        </div>
        <div
          className={`absolute h-full ${
            showBlurContent && detailPerson.known_for.length > 8
              ? "w-3/12 sm:w-2/12 lg:w-1/12"
              : "w-0"
          } transform transition-all duration-300 bottom-0 right-0 bg-gradient-to-r from-transparent to-gray-100 dark:from-transparent dark:to-black`}
        ></div>
      </div>
    </div>
  );
}
