import Image from "next/image";
import Layout from "../components/layout/Layout";
import MainButton from "../components/buttons/MainButton";
import ImgBg from "../public/images/bg-intro.jpeg";
import BatmanImg from "../public/images/bat-man.png";
import SpidermanImg from "../public/images/spider-man.png";
import BabyImg from "../public/images/baby.png";
import Card from "../components/introduction/card/Card";
import Accordion from "../components/accordion/Accordion";
import headerStyle from "../styles/header.module.css";
import { MainNavigation } from "../components/navigation/Navigation";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  theme,
  currentUser as currentUserAtom,
  preRegister as preRegisterAtom,
} from "../store";
import { useRouter } from "next/router";

export default function Introduction() {
  const router = useRouter();
  const currentUser = useRecoilValue(currentUserAtom);
  const setEmailPreRegister = useSetRecoilState(preRegisterAtom);

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

  const [emailValid, setEmailValid] = useState(false);
  const [errMsgEmail, setErrMsgEmail] = useState("");
  const inputEmail = useRef("");

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

  const validationEmail = (e) => {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!e) {
      setEmailValid(false);
      setErrMsgEmail("Email is required");
    } else if (!emailPattern.test(e)) {
      setEmailValid(false);
      setErrMsgEmail("Please enter a valid email");
    } else {
      setEmailValid(true);
    }
  };

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

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (emailValid) {
      const email = inputEmail.current.value;
      setEmailPreRegister(email);
      router.push("/register");
    } else {
      validationEmail();
    }
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
        <MainNavigation />
        <div className={`relative w-full ${headerStyle.headerContainer}`}>
          <Image
            className="bg-fixed top-0 z-0"
            src={ImgBg}
            alt="bg-intro"
            layout={"fill"}
            objectFit={"cover"}
            quality={100}
            priority={true}
          />
          <div className="absolute transform transition-all top-0 left-0 w-full h-full z-10 bg-gradient-to-br  from-black  to-black opacity-50 duration-500"></div>
          <div className="absolute h-full text-center text-white transition-colors duration-500 flex justify-center items-center p-4 md:px-8 lg:px-12 z-10 w-full">
            <div className="max-w-xl relative h-auto">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-6xl font-semibold mb-4">
                Unlimited Trailer movies, TV shows, and more.
              </h1>
              <h2 className="text-lg font-medium sm:text-xl lg:text-2xl mb-3 mt-3">
                Watch anywhere. Watch anytime.
              </h2>
              <h2 className="text-base font-light sm:text-xl mb-3 mt-5">
                Ready to watch? Enter your email to register your account.
              </h2>
              {currentUser ? (
                <div>
                  <MainButton
                    handleClick={() => router.push("/home")}
                    className="px-2 py-2 sm:py-3 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg mx-auto mt-3 lg:mt-0 bg-gradient-to-br rounded-sm shadow transform from-sky-400  
      to-primary hover:from-sky-400 hover:to-sky-500"
                  >
                    Get Start
                  </MainButton>
                </div>
              ) : (
                <div>
                  <form
                    onSubmit={handleSubmitEmail}
                    className="flex flex-col justify-center lg:flex-row lg:items-center"
                  >
                    <input
                      ref={inputEmail}
                      onChange={(e) => validationEmail(e.target.value)}
                      required
                      className="w-full lg:w-8/12 text-gray-500 focus:outline-none focus:ring focus:ring-cyan-500 px-4 py-1 sm:py-3"
                      type="email"
                    />
                    <div className="w-full lg:w-4/12">
                      <MainButton
                        handleClick={() => handleSubmitEmail}
                        className="px-2 py-2 sm:py-3 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg mx-auto mt-3 lg:mt-0 bg-gradient-to-br rounded-sm shadow transform from-sky-400  
  to-primary hover:from-sky-400 hover:to-sky-500"
                      >
                        Sign Up
                      </MainButton>
                    </div>
                  </form>
                  <span
                    className={`text-red-600 text-base mt-2 ${
                      !emailValid ? "inline-block" : "hidden"
                    }`}
                  >
                    {errMsgEmail}
                  </span>
                </div>
              )}
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
        {!currentUser && (
          <div className="mt-10 w-full lg:w-8/12">
            <h2 className="text-base md:text-lg lg:text-2xl font-medium text-center">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h2>

            <div className="">
              <form
                onSubmit={handleSubmitEmail}
                className="flex flex-col justify-center lg:flex-row lg:items-center"
              >
                <input
                  ref={inputEmail}
                  onChange={(e) => validationEmail(e.target.value)}
                  required
                  className="w-full lg:w-8/12 text-gray-500 focus:outline-none focus:ring focus:ring-cyan-500 px-4 py-1 sm:py-3"
                  type="email"
                />
                <div className="w-full lg:w-4/12">
                  <MainButton
                    handleClick={() => handleSubmitEmail}
                    className="px-2 py-2 sm:py-3 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg mx-auto mt-3 lg:mt-0 bg-gradient-to-br rounded-sm shadow transform from-sky-400  
  to-primary hover:from-sky-400 hover:to-sky-500"
                  >
                    Sign Up
                  </MainButton>
                </div>
              </form>
              <span
                className={`text-red-600 text-base mt-2 ${
                  !emailValid ? "inline-block" : "hidden"
                }`}
              >
                {errMsgEmail}
              </span>
            </div>
          </div>
        )}
      </div>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
