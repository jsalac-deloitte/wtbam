import { useEffect, useState, useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";
import PrizeContainer from "../components/PrizeContainer";
import { PRIZES, QUESTION_ENDPOINT } from "../config/app";
import API from "../axios";

const GamePlay: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const [currentPrize, setCurrentPrize] = useState<number>(1000);
  const [questionNumber, setQuestionNumber] = useState<number>(1);

  const setPrize = () => {
    setCurrentPrize(PRIZES[questionNumber + 1].prize);
    setQuestionNumber(questionNumber + 1);
  };

  const getQuestion = async (level: string) => {
    try {
      let response = await API.get(QUESTION_ENDPOINT + level);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestion("easy");
  }, [questionNumber]);

  return (
    <div className="h-full flex flex-col items-center ">
      <div className="grow h-full flex justify-around px-4 w-full    ">
        <div className="h-full grow flex flex-col bg-green-400 max-w-[80%] py-4 space-y-2">
          <div className="w-full flex justify-between space-x-2 px-2">
            <div className="flex h-24 w-1/3 bg-red-400 rounded-xl py-4 px-4  items-center">
              <h1 className="font-gruppo  text-[30px]">
                Player: <span>{playerContext?.user}</span>
              </h1>
            </div>
            <div className="h-24 w-1/3 bg-red-400 rounded-xl py-4 px-4 flex items-center">
              <h1 className="font-gruppo  text-[30px]">LIFE LINE OPTIONS</h1>
            </div>
            <div className="h-24 w-1/3 bg-red-400 rounded-xl py-4 px-4 flex items-center">
              <h1 className="font-gruppo  text-[30px]">
                Prize Value: <span>$1,000.00</span>
              </h1>
            </div>
          </div>
          <div className="h-full flex  bg-orange-200 ">
            <div className="flex flex-col grow items-center space-y-2">
              <div className="w-full bg-gray-400 h-2/3 rounded-xl">
                Question
              </div>
              <div className="w-full bg-blue-400 h-1/3 rounded-xl">
                multipl choice
              </div>
            </div>
          </div>
        </div>

        <PrizeContainer prizes={PRIZES} currentPrize={currentPrize} />
      </div>
    </div>
  );
};

export default GamePlay;
