import Head from "next/head";
import Footer from "../footer/Footer";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>

      <div>{props.children}</div>

      <Footer />
    </>
  );
}
