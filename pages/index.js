import Image from "next/image";
import Layout from "../components/layout/Layout";
import MainButton from "../components/buttons/MainButton";
import ImgBg from "../public/images/bg-intro.jpeg";
import BatmanImg from "../public/images/bat-man.png";
import SpidermanImg from "../public/images/spider-man.png";
import BabyImg from "../public/images/baby.png";
import Card from "../components/introduction/card/Card";
import Accordion from "../components/accordion/Accordion";
import { IntroNavigation } from "../components/navigation/Navigation";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { theme } from "../store";

export default function Introduction() {
  const [anq, setAnq] = useState({
    arr: [
      {
        ask: "What is cinema21?",
        answer: `Cinema21 is about portfolio like a Netflix, but this site just about trailer. List trailer such as : Movie, Tv show , etc.`,
        show: false,
      },
      {
        ask: "How much does cinema21 cost?",
        answer: "It's free, because this site just for stream trailer.",
        show: false,
      },
      {
        ask: "Where can i watch?",
        answer:
          "You can watch in mobile,tablet,laptop or desktop, because this site full responsive",
        show: false,
      },
      {
        ask: "Where can i watch trailer on cinema21?",
        answer: "You can watch trailer movie, tv show, etc",
        show: false,
      },
      {
        ask: "Is cinema21 good for kid?",
        answer: "Why not :D",
        show: false,
      },
    ],
  });

  const [contentCard, setContentCard] = useState({
    listContentCard: [
      {
        firstContent: {
          type: "text",
          content: {
            title: "Enjoy on your TV.",
            subTitle:
              "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
          },
        },
        secondContent: {
          type: "video",
          content: {
            isFirst: false,
            url: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v",
          },
        },
      },
      {
        firstContent: {
          type: "image",
          content: {
            isFirst: true,
            url: BatmanImg,
          },
        },
        secondContent: {
          type: "text",
          content: {
            darkMode: true,
            title: "Don't be afraid of the night, include the dark mode.",
            subTitle:
              "Don't worry this website include the dark/light mode for good experience for the stream, just click in navbar menu or you can try it.",
          },
        },
      },
      {
        firstContent: {
          type: "text",
          content: {
            title: "Watch everywhere.",
            subTitle:
              "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
          },
        },
        secondContent: {
          type: "video",
          content: {
            isFirst: false,
            url: "https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-id.m4v",
          },
        },
      },
      {
        firstContent: {
          type: "image",
          content: {
            isFirst: true,
            animate: "bounce",
            url: BabyImg,
          },
        },
        secondContent: {
          type: "text",
          content: {
            title: "Create profiles for kids.",
            subTitle:
              "Send kids on adventures with their favorite characters in a space made just for them—free with your account.",
          },
        },
      },
    ],
  });

  const currentTheme = useRecoilValue(theme);

  const handleChangeShow = (e) => {
    const copyArr = anq.arr.concat();
    const newArr = copyArr.map((data, index) => {
      if (index == e) {
        data.show = !data.show;
      } else {
        data.show = false;
      }
      return data;
    });
    setAnq({
      arr: newArr,
    });
  };

  useEffect(() => {
    const newArr = contentCard.listContentCard.concat();
    if (currentTheme === "dark") {
      newArr[1].firstContent.content.url = BatmanImg;
      newArr[1].secondContent.content.title =
        "Don't be afraid of the Light Day, include the light mode.";
    } else {
      newArr[1].firstContent.content.url = SpidermanImg;
      newArr[1].secondContent.content.title =
        "Don't be afraid of the Dark Night, include the dark mode.";
    }
    setContentCard({
      listContentCard: newArr,
    });
  }, [currentTheme]);

  return (
    <Layout title="Introduction">
      <header>
        <IntroNavigation />
        <div className="relative w-full" style={{ height: "90vh" }}>
          <Image
            className="bg-fixed top-0 z-0"
            src={ImgBg}
            alt="bg-intro"
            layout={"fill"}
            objectFit={"cover"}
            quality={100}
            priority={true}
          />
          <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-br  from-black via-sky-200 dark:via-gray-900 to-black opacity-70 duration-500"></div>
          <div className="absolute h-full text-center text-black dark:text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full">
            <div className="max-w-xl relative h-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4">
                Unlimited Trailer movies, TV shows, and more.
              </h1>
              <h2 className="text-2xl font-medium sm:text-3xl lg:text-4xl mb-3 mt-3">
                Watch anywhere. Watch anytime.
              </h2>
              <h2 className="text-xl font-light sm:text-3xl mb-3 mt-5">
                Ready to watch? Enter your email to register your account.
              </h2>
              <div className="flex flex-col justify-center lg:flex-row lg:items-center">
                <input
                  className="lg:w-10/12 text-gray-500 focus:outline-none focus:ring focus:ring-cyan-500 px-4 py-3 sm:py-4"
                  type="text"
                />

                <MainButton className="w-4/12 px-2 py-3 sm:py-4 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg mx-auto mt-3 lg:mt-0">
                  Sign Up
                </MainButton>
              </div>
            </div>
          </div>
        </div>
      </header>

      <hr className="border-b-4 border-gray-500 shadow-2xl" />

      {contentCard.listContentCard.map((content, index) => {
        return (
          <div key={index}>
            <div className="p-4 md:px-8 lg:px-18 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white w-full flex justify-center">
              <Card type="textFirst" content={content} />
            </div>

            <hr className="border-b-4 border-gray-500 shadow-2xl" />
          </div>
        );
      })}

      <div className="p-4 md:px-8 lg:px-18 transform transition-all duration-500 bg-gray-100 dark:bg-black text-black dark:text-white w-full flex flex-col justify-center items-center">
        <div className="py-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="w-full lg:w-8/12">
          {anq.arr.map((anq, index) => {
            return (
              <Accordion
                key={index}
                idx={index}
                anq={anq}
                onHandleChangeShow={handleChangeShow}
              />
            );
          })}
        </div>
        <div className="mt-10">
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-center">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h2>
        </div>
      </div>
    </Layout>
  );
}
