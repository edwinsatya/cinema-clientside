import cardStyle from "../../../styles/card.module.css";

export default function ContentBox(props) {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold">
          {props.title}
        </h3>
        <div className="ml-3">{props.icon}</div>
      </div>
      <div className="px-4 py-10">
        <div
          className={`${cardStyle.cardWrapper} flex items-stretch overflow-x-auto overflow-y-hidden`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
