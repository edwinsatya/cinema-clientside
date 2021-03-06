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
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  theme,
  currentUser as currentUserAtom,
  preRegister as preRegisterAtom,
} from "../store";
import { cinemaAPI } from "../services/api";
import { useRouter } from "next/router";

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
                Portfolio Trailer movies, TV shows, and more.
              </h1>
              <h2 className="text-lg font-medium sm:text-xl lg:text-2xl mb-3 mt-3">
                Watch anywhere. Watch anytime.
              </h2>
              <h2 className="text-base font-light sm:text-xl mb-3 mt-5">
                Ready to watch? Just Enter your name for feature chat.
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
                    onSubmit={handleSubmitName}
                    className="flex flex-col justify-center lg:flex-row lg:items-center"
                  >
                    <input
                      value={inputName}
                      onChange={(e) => validationName(e.target.value)}
                      required
                      className="w-full lg:w-8/12 text-gray-500 focus:outline-none focus:ring focus:ring-cyan-500 px-4 py-1 sm:py-3"
                      type="text"
                    />
                    <div className="w-full lg:w-4/12">
                      <MainButton
                        handleClick={() => handleSubmitName}
                        className="px-2 py-2 sm:py-3 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg mx-auto mt-3 lg:mt-0 bg-gradient-to-br rounded-sm shadow transform from-sky-400  
  to-primary hover:from-sky-400 hover:to-sky-500"
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
                  className="w-full lg:w-8/12 text-gray-500 focus:outline-none focus:ring focus:ring-cyan-500 px-4 py-1 sm:py-3"
                  type="text"
                />
                <div className="w-full lg:w-4/12">
                  <MainButton
                    handleClick={() => handleSubmitName}
                    className="px-2 py-2 sm:py-3 text-xs sm:p-2 sm:text-sm lg:px-4 lg:text-lg mx-auto mt-3 lg:mt-0 bg-gradient-to-br rounded-sm shadow transform from-sky-400  
  to-primary hover:from-sky-400 hover:to-sky-500"
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
