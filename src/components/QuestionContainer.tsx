import { useReducer } from "react";

type QuestionContainerProps = {
  question: string;
  correct: string;
  incorrect: string[];
};

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  question,
  correct,
  incorrect,
}) => {
  return (
    <div>
      <div>
        <p>{question}</p>
      </div>
      <div></div>
    </div>
  );
};
