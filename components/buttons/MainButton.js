export default function MainButton(props) {
  const { handleClick } = props;
  return (
    <button
      onClick={() => handleClick()}
      className={`w-full hover:scale-105 transition duration-200
      text-white focus:outline-none focus:ring focus:ring-blue-400 text-center ${props.className}`}
    >
      {props.children}
    </button>
  );
}
