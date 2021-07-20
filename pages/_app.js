import "tailwindcss/tailwind.css";
import "../styles/global.css";
import AuthMode from "../libs/authMode/AuthMode";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthMode>
        <Component {...pageProps} />
      </AuthMode>
    </RecoilRoot>
  );
}

export default MyApp;
