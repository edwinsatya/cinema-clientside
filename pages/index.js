import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Accordion from "../components/accordion/Accordion";
import MainButton from "../components/buttons/MainButton";
import Card from "../components/introduction/card/Card";
import Layout from "../components/layout/Layout";
import { MainNavigation } from "../components/navigation/Navigation";
import BabyImg from "../public/images/baby.png";
import BatmanImg from "../public/images/bat-man.png";
import ImgBg from "../public/images/bg-intro.jpeg";
import SpidermanImg from "../public/images/spider-man.png";
import { cinemaAPI } from "../services/api";
import {
  currentUser as currentUserAtom,
  theme
} from "../store";
import headerStyle from "../styles/header.module.css";

export default function Introduction() {
  const router = useRouter();
  // const currentUser = useRecoilValue(currentUserAtom);
  // const setEmailPreRegister = useSetRecoilState(preRegisterAtom);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

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

  const [nameValid, setNameValid] = useState(false);
  const [errMsgName, setErrMsgName] = useState("");
  const [inputName, setInputName] = useState("");

  const [contentCard, setContentCard] = useState({
    listContentCard: [
      {
        firstContent: {
          type: "text",
          content: {
            title: "Enjoy Trailer Movie",
            subTitle: "Watch trailer with your family",
          },
        },
        secondContent: {
          type: "video",
          content: {
            isFirst: false,
            url: "",
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
            title: "Responsive ready.",
            subTitle:
              "Stream trailer movies and TV shows on your phone, tablet, laptop, and more.",
          },
        },
        secondContent: {
          type: "video",
          content: {
            isFirst: false,
            url: "",
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
            title: "kids? dont worry",
            subTitle: "This website is safe for kids",
          },
        },
      },
    ],
  });

  const currentTheme = useRecoilValue(theme);

  const validationName = (e) => {
    setInputName(e);

    if (!e) {
      setNameValid(false);
      setErrMsgName("Name is required");
    } else {
      setNameValid(true);
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

  const handleSubmitName = async (e) => {
    e.preventDefault();
    try {
      if (nameValid) {
        const body = {
          name: inputName,
        };
        const { data: res } = await cinemaAPI.post("/users/register", body);
        localStorage.setItem("name", inputName);
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("token", res.token);
        setCurrentUser(inputName);
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);

  return (
    <Layout title="Introduction">
      <header>
        <MainNavigation />
        <div className={`relative w-full ${headerStyle.headerContainer}`}>
          <Image
            className="top-0 z-0 bg-fixed"
            src={ImgBg}
            alt="bg-intro"
            layout={"fill"}
            objectFit={"cover"}
            quality={100}
            priority={true}
          />
          <div className="absolute top-0 left-0 z-10 w-full h-full transition-all duration-500 transform opacity-50 bg-gradient-to-br from-black to-black"></div>
          <div className="absolute z-10 flex items-center justify-center w-full h-full p-4 text-center text-white transition-colors duration-500 md:px-8 lg:px-12">
            <div className="relative h-auto max-w-xl">
              <h1 className="mb-4 text-xl font-semibold sm:text-2xl md:text-3xl lg:text-6xl">
                Portfolio Trailer movies, TV shows, and more.
              </h1>
              <h2 className="mt-3 mb-3 text-lg font-medium sm:text-xl lg:text-2xl">
                Watch anywhere. Watch anytime.
              </h2>
              <h2 className="mt-5 mb-3 text-base font-light sm:text-xl">
                Ready to watch? Just Enter your name for feature chat.
              </h2>
              {currentUser ? (
                <div>
                  <MainButton
                    handleClick={() => router.push("/home")}
                    className="px-2 py-2 mx-auto mt-3 text-xs transform rounded-sm shadow sm:py-3 sm:p-2 sm:text-sm lg:px-4 lg:text-lg lg:mt-0 bg-gradient-to-br from-sky-400 to-primary hover:from-sky-400 hover:to-sky-500"
                  >
                    Get Start
                  </MainButton>
                </div>
              ) : (
                <div>
                  <form
                    onSubmit={handleSubmitName}
                    className="flex flex-col justify-center lg:flex-row lg:items-center"
                  >
                    <input
                      value={inputName}
                      onChange={(e) => validationName(e.target.value)}
                      required
                      className="w-full px-4 py-1 text-gray-500 lg:w-8/12 focus:outline-none focus:ring focus:ring-cyan-500 sm:py-3"
                      type="text"
                    />
                    <div className="w-full lg:w-4/12">
                      <MainButton
                        handleClick={() => handleSubmitName}
                        className="px-2 py-2 mx-auto mt-3 text-xs transform rounded-sm shadow sm:py-3 sm:p-2 sm:text-sm lg:px-4 lg:text-lg lg:mt-0 bg-gradient-to-br from-sky-400 to-primary hover:from-sky-400 hover:to-sky-500"
                      >
                        Home
                      </MainButton>
                    </div>
                  </form>
                  <span
                    className={`text-primary text-base mt-2 ${
                      !nameValid ? "inline-block" : "hidden"
                    }`}
                  >
                    {errMsgName}
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
            <div className="flex justify-center w-full p-4 text-black transition-all duration-500 transform bg-gray-100 md:px-8 lg:px-18 dark:bg-black dark:text-white">
              <Card type="textFirst" content={content} />
            </div>

            <hr className="border-b-4 border-gray-500 shadow-2xl" />
          </div>
        );
      })}

      <div className="flex flex-col items-center justify-center w-full p-4 text-black transition-all duration-500 transform bg-gray-100 md:px-8 lg:px-18 dark:bg-black dark:text-white">
        <div className="py-10">
          <h1 className="text-3xl font-semibold text-center sm:text-4xl md:text-5xl lg:text-6xl">
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
          <div className="w-full mt-10 lg:w-8/12">
            <h2 className="text-base font-medium text-center md:text-lg lg:text-2xl">
              Ready to watch? Enter your name for feature chat.
            </h2>

            <div className="mt-3">
              <form
                onSubmit={handleSubmitName}
                className="flex flex-col justify-center lg:flex-row lg:items-center"
              >
                <input
                  value={inputName}
                  onChange={(e) => validationName(e.target.value)}
                  required
                  className="w-full px-4 py-1 text-gray-500 lg:w-8/12 focus:outline-none focus:ring focus:ring-cyan-500 sm:py-3"
                  type="text"
                />
                <div className="w-full lg:w-4/12">
                  <MainButton
                    handleClick={() => handleSubmitName}
                    className="px-2 py-2 mx-auto mt-3 text-xs transform rounded-sm shadow sm:py-3 sm:p-2 sm:text-sm lg:px-4 lg:text-lg lg:mt-0 bg-gradient-to-br from-sky-400 to-primary hover:from-sky-400 hover:to-sky-500"
                  >
                    Home
                  </MainButton>
                </div>
              </form>
              <span
                className={`text-primary text-base mt-2 ${
                  !nameValid ? "inline-block" : "hidden"
                }`}
              >
                {errMsgName}
              </span>
            </div>
          </div>
        )}
      </div>
      <hr className="border-b-4 border-gray-500 shadow-2xl" />
    </Layout>
  );
}
