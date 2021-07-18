import Head from "next/head";
import Footer from "../footer/Footer";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div>{props.children}</div>

      <Footer />
    </>
  );
}
