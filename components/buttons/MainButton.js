export default function MainButton(props) {
  return (
    <button
      className={`bg-gradient-to-br rounded-sm shadow transform from-sky-400  
      to-primary hover:from-sky-400 hover:to-sky-500 hover:scale-105 transition duration-200
      text-white focus:outline-none focus:ring focus:ring-blue-400 text-center ${props.className}`}
    >
      {props.children}
    </button>
  );
}
