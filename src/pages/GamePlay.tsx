import { useEffect, useState, useContext, useRef } from "react";
import { PlayerContext, QuestionLevelType } from "../Context/PlayerContext";
import PrizeContainer from "../components/PrizeContainer";
import { PRIZES, QUESTION_ENDPOINT } from "../config/app";
import API from "../axios";
import { QuestionType, SetOfQuestionsType } from "../config/types";
import QuestionContainer from "../components/QuestionContainer";
import { HiPhone, HiHand, HiOutlineChevronDoubleRight } from "react-icons/hi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const GamePlay: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const [levelOfDifficulty, setLevelOfDifficulty] = useState<string>("easy");
  const [currentPrize, setCurrentPrize] = useState<string>("0.00");
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [isFinalQuestion, setIsFinalQuestion] = useState<boolean>(false);
  const [playStarted, setPlayStarted] = useState<boolean>(false);
  const [use5050, setUse5050] = useState<boolean>(false);
  const [useCallAFriend, setUseCallAFriend] = useState<boolean>(false);
  const [useSkip, setUseSkip] = useState<boolean>(false);
  const [useRemoveIncorrectAnswer, setUseRemoveIncorrectAnswer] =
    useState(false);

  const [questions, setQuestions] = useState<SetOfQuestionsType>(
    {} as SetOfQuestionsType
  );

  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
    {} as QuestionType
  );

  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [showGreeting, setShowGreeting] = useState<boolean>(true);

  const videoSrc: string = "/assets/wtbam.mp4";
  const videoPlayer = useRef<HTMLVideoElement>(null);

  /**instantiate the navigation function of react */
  const navigate = useNavigate();

  /**--------------------------------------------
   * configuration for the level of difficulty
   * of the question
   * --------------------------------------------
   */
  const QUESTION_LEVEL: QuestionLevelType = {
    easy: [1, 2, 3, 4, 5],
    medium: [6, 7, 8, 9, 10],
    hard: [11, 12, 13, 14, 15, 16],
  };

  /**------------------------------------------
   * function to speech
   * ------------------------------------------
   */
  const speakText = (text: string, callback: any = "") => {
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;

    msg.onend = function (e) {
      if (typeof callback === "function") {
        callback();
      }
    };

    speechSynthesis.speak(msg);
  };

  /**--------------------------------------------
   * Text to speech function to greet the player
   * --------------------------------------------
   */
  const greetPlayer = async () => {
    if (showGreeting) {
      let msg: string = `Hi ${
        playerContext!.user
      }. Welcome to. "Who wants to be a millionaire...". 
        Are you ready to become the next millionaire...?.`;

      speakText(msg, function () {
        setShowGreeting(false);
        setShowVideo(true);
      });
    }
  };

  /**--------------------------------------------
   * Greet the player before the game start
   * call the text to speech function getPlayer
   * --------------------------------------------
   */
  useEffect(() => {
    greetPlayer();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**------------------------------------------
   * Get the question from the API
   * This will fetch new set of question
   * when the level of difficulty is change
   * ------------------------------------------
   */
  const fetchQuestion = async () => {
    console.log("fetch questions");
    let response = await API.get(QUESTION_ENDPOINT + levelOfDifficulty);
    await setQuestions(response.data);
    setQuestionIndex(0);
    await setCurrentQuestion(questions[questionIndex]);
  };

  /**--------------------------------------------
   * Callback when the video intro is finished
   * --------------------------------------------
   */
  const myCallback = () => {
    fetchQuestion();
    setShowVideo(false);
    setShowGreeting(false);
    setPlayStarted(true);
  };

  /**
   * immidiately start the game
   */
  const startTheGame = () => {
    videoPlayer.current?.pause();
    speechSynthesis.cancel();
    setPlayStarted(true);
    fetchQuestion();
    setShowVideo(false);
    setShowGreeting(false);
  };

  /**--------------------------------------------
   * call function fetchQuestion new set of questions
   *  when level of difficulty changes
   * --------------------------------------------
   */
  useEffect(() => {
    fetchQuestion();
  }, [levelOfDifficulty]); // eslint-disable-line react-hooks/exhaustive-deps

  /**--------------------------------------------
   * Player Lost
   * --------------------------------------------
   */
  const playerLost = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sorry wrong answer..",
      footer: '<a to="/">Thank you for playing fair!</a>',
    });
    playerContext!.setPrize(currentPrize);
    playerContext!.setWinner(false);
    navigate("/end-game");
  };

  /**--------------------------------------------
   * when the player picked answer
   * this will validate if the answer
   * is correct or wrong
   * @param answer
   * --------------------------------------------
   */
  const pickAnswer = (isCorrect: boolean) => {
    console.log(isCorrect);
    if (isCorrect) {
      if (!isFinalQuestion) {
        speakText("Your answer is correct!", function () {
          setQuestionNumber(questionNumber + 1);
          setCurrentPrize(PRIZES[questionNumber]);
          setUseRemoveIncorrectAnswer(false);
        });
      } else {
        playerContext!.setPrize(PRIZES[questionNumber + 1]);
        playerContext!.setWinner(true);
        speakText(
          "Congratulations! 'You are now our new Millionaire!'",
          function () {
            navigate("/end-game");
          }
        );
      }
    } else {
      playerLost();
    }
  };

  /**--------------------------------------------
   * Get the next question for the next prize
   * --------------------------------------------
   */
  useEffect(() => {
    const nextQuestion = async () => {
      let level = "easy";
      if (!isFinalQuestion) {
        Object.keys(QUESTION_LEVEL).forEach((item) => {
          if (
            QUESTION_LEVEL[item as keyof QuestionLevelType].includes(
              questionNumber + 1
            )
          ) {
            return (level = item);
          }
        });
        setQuestionIndex(questionIndex + 1);
        setLevelOfDifficulty(level);
        setCurrentQuestion(questions[questionIndex]);
      }
    };
    if (!isFinalQuestion) {
      nextQuestion();
    }
  }, [questionNumber]);

  useEffect(() => {
    if (PRIZES.length === questionNumber + 1) {
      setIsFinalQuestion(true);
    }
  }, [questionNumber]);

  useEffect(() => {
    if (isFinalQuestion) {
      speakText("For the Final and Last Question!", function () {
        setQuestionIndex(questionIndex + 1);
        setCurrentQuestion(questions[questionIndex]);
      });
    }
  }, [isFinalQuestion]);

  /**
   * Life line 50/50 will remove to incorrect answer
   */
  const uselifeLine5050 = () => {
    speakText("Computer removed the 2 incorrect answer please", () => {
      setUseRemoveIncorrectAnswer(true);
      setUse5050(true);
    });
  };

  /**
   * Life line you can talk to your friend and ask for help
   */
  const uselifeLineCallAFriend = () => {
    speakText(
      "You now have 2 minutes to talk to your friend and ask for help",
      () => {
        setUseCallAFriend(true);
      }
    );
  };

  /**
   * Life line skip question will give the next question on queue
   */
  const uselifeLineSkipQuestion = () => {
    speakText(
      "Computer please skip this question and move to the next one",
      () => {
        setQuestionIndex(questionIndex + 1);
        setCurrentQuestion(questions[questionIndex]);
        setUseSkip(true);
      }
    );
  };

  /**
   * stop greeting when refresh and check for player name
   */
  useEffect(() => {
    if (playerContext?.user === null || playerContext?.user === "") {
      navigate("/");
    }
    return () => {
      speechSynthesis.cancel();
    };
  }, [navigate, playerContext?.user]);

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
                <span className="text-2xl ">{PRIZES[questionNumber]}</span>
              </h2>
              <div className="w-full flex justify-between font-barlow-condensed">
                <p>
                  Question # :{" "}
                  <span className="text-orange-500">
                    {" "}
                    {questionNumber + 1}{" "}
                  </span>
                </p>
                <p>
                  Money :{" "}
                  <span className="text-orange-500"> {currentPrize} </span>
                </p>
                <p>
                  Level :
                  <span className="text-orange-500">
                    {" "}
                    {levelOfDifficulty.toUpperCase()}{" "}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center  h-16 space-x-8 ">
            {/* call a friend button */}
            <button
              className={`${
                useCallAFriend
                  ? "bg-gray-400 text-gray-500"
                  : "text-gray-100 hover:bg-yellow-400"
              } flex items-center justify-center h-14 w-14 border border-gray-400 rounded-full text-4xl   `}
              title="click to call a friend"
              onClick={uselifeLineCallAFriend}
              disabled={useCallAFriend && playStarted && true}
            >
              <HiPhone />
            </button>

            {/* removed 2 incorrect answer */}
            <button
              className={`${
                use5050
                  ? "bg-gray-400 text-gray-500"
                  : "text-gray-100 hover:bg-yellow-400"
              } flex items-center justify-center h-14 w-14 border border-gray-400 rounded-full text-4xl text-gray-100`}
              title="click to remove 2 wrond answer"
              onClick={uselifeLine5050}
              disabled={use5050 && playStarted && true}
            >
              <HiHand />
            </button>

            {/* skip question */}
            <button
              className={` ${
                useSkip
                  ? "bg-gray-400 text-gray-500"
                  : "text-gray-100 hover:bg-yellow-400"
              } flex items-center justify-center h-14 w-14 border border-gray-400 rounded-full text-4xl text-gray-100`}
              title="click to skip question"
              onClick={uselifeLineSkipQuestion}
              disabled={useSkip && playStarted && true}
            >
              <HiOutlineChevronDoubleRight />
            </button>
          </div>
        </div>
      </div>

      {playStarted && (
        <div className="flex grow">
          <div className="grow flex justify-center w-full items-center     ">
            <div className="flex items-center h-full w-full rounded-xl">
              {currentQuestion && (
                <QuestionContainer
                  item={currentQuestion}
                  pickAnswer={(ans: boolean) => pickAnswer(ans)}
                  removeIncorrect={useRemoveIncorrectAnswer}
                />
              )}
            </div>
          </div>

          <PrizeContainer prizes={PRIZES} indexPrize={questionNumber} />
        </div>
      )}

      {showVideo && !playStarted && (
        <div className="h-full w-full flex items-center justify-center bg-transparent">
          <video
            autoPlay
            onEnded={myCallback}
            ref={videoPlayer}
            muted={false}
            className="h-auto w-auto"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag. I suggest you upgrade
            your browser.
          </video>
        </div>
      )}

      {showGreeting && (
        <div className="grow w-full flex flex-col items-center justify-center  space-y-4 ">
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
          <button
            onClick={startTheGame}
            className="underline cursor-pointer text-purple-400 underline-offset-4"
          >
            START
          </button>
        </div>
      )}
    </div>
  );
};

export default GamePlay;
