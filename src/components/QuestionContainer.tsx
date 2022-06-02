import { useEffect, useState } from "react";
import { QuestionType } from "../config/types";
import Swal from "sweetalert2";

type QuestionProps = {
  item: QuestionType;
  pickAnswer: (ans: boolean) => void;
  removeIncorrect: boolean;
};

const QuestionContainer: React.FC<QuestionProps> = ({
  item,
  pickAnswer,
  removeIncorrect,
}) => {
  const options = [...item.incorrectAnswers, item.correctAnswer].sort(
    () => Math.random() - 0.5
  );

  const [removeFrom, setRemoveFrom] = useState<number>(-2);

  useEffect(() => {
    const start = Math.floor(
      Math.random() * (item.incorrectAnswers.length - 1)
    );
    if (removeIncorrect) {
      setRemoveFrom(start);
    }
  }, [removeIncorrect, item.incorrectAnswers.length]);

  const finalAnswer = (answer: string) => {
    Swal.fire({
      title: `Your answer is ${answer}`,
      text: "Is this your final answer?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        validateAnswer(answer);
      }
    });
  };

  const validateAnswer = (answer: string) => {
    if (answer === item.correctAnswer) {
      playCorrect();
      pickAnswer(true);
    } else {
      playWrong();
      pickAnswer(false);
    }
  };

  const playCorrect = () => {
    var audio = new Audio("/assets/correct.mp3");
    audio.play();
  };

  const playWrong = () => {
    var audio = new Audio("/assets/buzzer.mp3");
    audio.play();
  };

  return (
    <div className="h-full w-full text-white">
      {item && (
        <div className="h-full w-full flex flex-col justify-around space-y-8  tracking-wider">
          <div className="flex items-center grow w-full bg-purple-400 backdrop-blur-sm bg-opacity-20 rounded-2xl border">
            <p className="grow text-center px-2 py-2 ">{item.question}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full  overflow-y-hidden">
            {options.map((option, index) => (
              <button
                key={index + option}
                className={`${
                  (option === item.incorrectAnswers[removeFrom] &&
                    removeIncorrect) ||
                  (option === item.incorrectAnswers[removeFrom + 1] &&
                    removeIncorrect)
                    ? "hidden"
                    : "backdrop-blur-sm bg-opacity-20"
                } flex w-full grow border rounded-full  bg-purple-400  cursor-pointer`}
                onClick={() => finalAnswer(option)}
              >
                <p className="grow flex  items-center px-2 py-3">
                  <span className="text-center grow ">{option}</span>
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionContainer;
