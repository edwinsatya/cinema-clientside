import React, { useEffect, useState } from "react";

function Icon(props) {
  const [color, setColor] = useState("#ff3");
  const listColor = ["#CDF0EA", "#3EDBF0", "#7D5A50", "#FF75A0", "#ff3"];

  useEffect(() => {
    let count = 0;
    setInterval(() => {
      if (count === 4) {
        setColor(listColor[count]);
        count = 0;
      } else {
        setColor(listColor[count]);
        count++;
      }
    }, 3000);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      fill="none"
      viewBox="0 0 253 253"
    >
      <g filter="url(#filter0_f)">
        <path
          fill={color}
          d="M208.04 227.688H44.62c-10.84 0-19.62-8.78-19.62-19.619V44.619C25 33.78 33.78 25 44.62 25h163.42c10.839 0 19.62 8.78 19.62 19.62v163.449c0 10.81-8.781 19.619-19.62 19.619z"
        ></path>
      </g>
      <path
        fill="url(#paint0_linear)"
        d="M198.744 217.402H35.324c-10.84 0-19.62-8.781-19.62-19.62V34.333c0-10.84 8.78-19.62 19.62-19.62h163.42c10.839 0 19.619 8.78 19.619 19.62v163.449c0 10.811-8.78 19.62-19.619 19.62z"
      ></path>
      <path
        fill={color}
        d="M74.134 150.478v-19.305l-23.595-14.386 23.595-14.443V83.21l-51.738 33.577 51.738 33.691zM83.4 194.178h15.072l52.195-156.241h-15.072L83.4 194.178zM154.929 83.21v19.134l23.566 14.443-23.566 14.386v19.305l51.708-33.691-51.708-33.577z"
      ></path>
      <defs>
        <filter
          id="filter0_f"
          width="252.66"
          height="252.688"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          ></feBlend>
          <feGaussianBlur
            result="effect1_foregroundBlur"
            stdDeviation="12.5"
          ></feGaussianBlur>
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="117.034"
          x2="117.034"
          y1="14.713"
          y2="217.402"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8E8BA0"></stop>
          <stop offset="1" stopColor="#2D2C2C"></stop>
        </linearGradient>
      </defs>
      <style jsx>
        {`
          path {
            transition: fill 1s ease;
          }
        `}
      </style>
    </svg>
  );
}

export default Icon;
