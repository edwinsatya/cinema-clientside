import IconStar from "../../icons/IconStar";

export default function RatingStar(props) {
  const { className, voteAvg } = props;

  const countRating = (e) => {
    const rating = Math.floor(e);
    const arr = [false, false, false, false, false];
    switch (rating) {
      case 1:
      case 2:
        arr.fill(true, 0, 1);
        break;
      case 3:
      case 4:
        arr.fill(true, 0, 2);
        break;
      case 5:
      case 6:
        arr.fill(true, 0, 3);
        break;
      case 7:
      case 8:
        arr.fill(true, 0, 4);
        break;
      case 9:
      case 10:
        arr.fill(true, 0, 5);
        break;
      default:
        arr.fill(true, 0, 0);
        break;
    }
    return arr;
  };

  return (
    <div className={`${className}`}>
      {countRating(voteAvg).map((fire, index) => {
        return (
          <IconStar
            key={index}
            className={`${fire ? "text-yellow-300" : "text-gray-500"}`}
          />
        );
      })}
    </div>
  );
}
