import cardStyle from "../../../styles/card.module.css";

export default function ContentBox(props) {
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
          {props.title}
        </h3>
        <div className="ml-3">{props.icon}</div>
      </div>
      <div className="px-4 py-10 shadow-inner">
        <div
          className={`${cardStyle.cardWrapper} flex items-center overflow-x-auto overflow-y-hidden`}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
