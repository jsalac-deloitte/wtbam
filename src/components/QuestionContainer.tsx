import { useEffect, useState } from "react";
import { QuestionType } from "../config/types";

type QuestionProps = {
  item: QuestionType;
  pickAnswer: () => void;
};

const QuestionContainer: React.FC<QuestionProps> = ({ item, pickAnswer }) => {
  const options = [...item.incorrectAnswers, item.correctAnswer].sort(
    () => Math.random() - 0.5
  );
  const multitpleChoice: string[] = ["A", "B", "C", "D"];

  useEffect(() => {
    console.log("data", item?.correctAnswer);
  }, [item]);

  return (
    <div className="h-full w-full text-white">
      {item && (
        <div className="h-full w-full flex flex-col justify-around space-y-8  tracking-wider">
          <div className="flex items-center grow w-full bg-purple-400 backdrop-blur-sm bg-opacity-20 rounded-2xl border">
            <p className="grow text-center px-2 py-2 ">{item.question}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 w-full  ">
            {options.map((item, index) => (
              <div
                key={item}
                className="flex w-full  grow border rounded-full  bg-purple-400 backdrop-blur-sm bg-opacity-20 overflow-hidden cursor-pointer"
                onClick={() => alert(item)}
              >
                <p className="grow flex  items-center ">
                  <span className="flex items-center  justify-center text-yellow-400 font-bold border rounded-full h-12 w-12  ">
                    {multitpleChoice[index]}
                  </span>
                  <span className="text-center grow ">{item}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
