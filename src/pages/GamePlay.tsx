import { useEffect, useState, useContext, useRef } from "react";
import { PlayerContext, QuestionLevelType } from "../Context/PlayerContext";
import PrizeContainer from "../components/PrizeContainer";
import { PRIZES, QUESTION_ENDPOINT } from "../config/app";
import API from "../axios";
import { SetOfQuestionsType } from "../config/types";
import QuestionContainer from "../components/QuestionContainer";
import { HiPhone, HiHand, HiOutlineChevronDoubleRight } from "react-icons/hi";

const GamePlay: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const [levelOfDifficulty, setLevelOfDifficulty] = useState<string>("easy");
  const [currentPrize, setCurrentPrize] = useState<number>(1000);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [isFinalQuestion, setIsFinalQuestion] = useState<boolean>(false);
  const [questions, setQuestions] = useState<SetOfQuestionsType | null>(
    {} as SetOfQuestionsType
  );
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [showGreeting, setShowGreeting] = useState<boolean>(false);

  const videoSrc: string = "/assets/wtbam.mp4";
  const videoPlayer = useRef<HTMLVideoElement>(null);

  const myCallback = () => {
    setShowVideo(false);
    setShowGreeting(true);
    greetPlayer();
  };

  const greetPlayer = async () => {
    var msg = new SpeechSynthesisUtterance();

    msg.text = `Hi ${
      playerContext!.user
    }. Welcome to. "Who wants to be a millionaire...". 
          Are you ready to become the next millionaire...?.`;

    msg.onend = function (e) {
      setShowGreeting(false);
    };

    speechSynthesis.speak(msg);
  };

  const QUESTION_LEVEL: QuestionLevelType = {
    easy: [1, 2, 3, 4, 5],
    medium: [6, 7, 8, 9, 10],
    hard: [11, 12, 13, 14, 15, 16],
  };

  const nextQuestion = (question: number): void => {
    let level = "easy";
    if (PRIZES.length === question) {
      setIsFinalQuestion(true);
    }
    if (!isFinalQuestion) {
      Object.keys(QUESTION_LEVEL).forEach((item) => {
        if (
          QUESTION_LEVEL[item as keyof QuestionLevelType].includes(question)
        ) {
          return (level = item);
        }
      });
      setQuestionNumber(question);
      setLevelOfDifficulty(level);
    }
  };

  //trigger to play sound for the final question
  useEffect(() => {
    if (isFinalQuestion) {
      //play sound
    }
  }, [isFinalQuestion]);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.get(QUESTION_ENDPOINT + levelOfDifficulty);
      await setQuestions(response.data);
    };

    fetchData();
  }, [levelOfDifficulty]);

  return (
    <div className="h-full flex flex-col py-4 px-2 space-y-2">
      <div className="space-y-4 md:flex md:space-x-4">
        <div className=" flex justify-center items-center">
          <img src="./assets/wtbm logo.png" alt="WTBM Logo" className="h-48" />
        </div>
        <div className=" md:grow md:flex md:flex-col md:justify-between md:py-2 space-y-2">
          <div className="bg-gray-300 rounded-xl py-2 px-4 font-barlow-condensed tracking-widest">
            <div className="border-b border-gray-400">
              <h2 className="flex justify-between  items-center ">
                <span className="font-bold text-purple-600">Player : </span>{" "}
                <span className="text-2xl ">{playerContext?.user}</span>
              </h2>
            </div>
            <div>
              <h2 className="flex justify-between items-center ">
                <span className="font-bold text-purple-600">
                  Question Prize :{" "}
                </span>{" "}
                <span className="text-2xl ">10,000.00</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center justify-center  h-16 space-x-8 ">
            <div
              className="flex items-center justify-center h-14 w-14 border border-gray-400 rounded-full text-4xl text-gray-100"
              title="click to call a friend"
            >
              <HiPhone />
            </div>
            <div
              className="flex items-center justify-center h-14 w-14 border border-gray-400 rounded-full text-4xl text-gray-100"
              title="click to remove 2 wrond answer"
            >
              <HiHand />
            </div>
            <div
              className="flex items-center justify-center h-14 w-14 border border-gray-400 rounded-full text-4xl text-gray-100"
              title="click to skip question"
            >
              <HiOutlineChevronDoubleRight />
            </div>
          </div>
        </div>
      </div>
      {!showVideo && !showGreeting && (
        <div className="flex grow">
          <div className="grow flex justify-center w-full items-center     ">
            <div className="flex items-center h-full w-full rounded-xl">
              {questions!.length > 0 && (
                <QuestionContainer
                  item={questions![0]}
                  pickAnswer={() => alert("my answer is")}
                />
              )}
            </div>
          </div>

          <PrizeContainer prizes={PRIZES} indexPrize={questionNumber - 1} />
        </div>
      )}

      {showVideo && (
        <div className="h-full w-full flex items-center justify-center bg-transparent">
          <video autoPlay onEnded={myCallback} ref={videoPlayer} muted={false}>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag. I suggest you upgrade
            your browser.
          </video>
        </div>
      )}

      {showGreeting && (
        <div className="grow w-full flex items-center justify-center ">
          <div className="h-auto bg-purple-400 rounded-lg backdrop-blur-sm bg-opacity-20 px-4 py-8">
            <h1 className="text-center text-white">
              Hi
              <span className="text-lg font-bold"> {playerContext!.user} </span>
              <br />
              <span className="">
                "Welcome to. "Who wants to be a millionaire."
              </span>
              <br />
              <span>Are you ready to become the next millionaire?</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePlay;
