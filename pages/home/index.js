import Layout from "../../components/layout/Layout";
import { MainNavigation } from "../../components/navigation/Navigation";

export default function Home() {
  return (
    <Layout title="Home">
      <header>
        <MainNavigation />
        <div className="relative" style={{ height: "90vh" }}>
          <div className="absolute w-full" style={{ height: "90vh" }}>
            <video
              id="video"
              autoPlay={true}
              loop={true}
              muted={true}
              src="./home.mp4"
              type="video/mp4"
              style={{ height: "100%", width: "100%", objectFit: "initial" }}
            ></video>
          </div>
          <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-b from-gray-300 dark:from-black via-transparent dark:via-transparent to-gray-300 dark:to-black opacity-30 duration-500"></div>
        </div>
      </header>
    </Layout>
  );
}
