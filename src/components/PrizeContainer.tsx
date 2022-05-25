import { QuestionType } from "../config/types";

type PrizeProps = {
  prizes: string[];
  indexPrize: number;
};

const PrizeContainer: React.FC<PrizeProps> = ({ prizes, indexPrize = 0 }) => {
  return (
    <div className="hidden md:flex  w-[250px] h-auto ">
      <div className="flex flex-col-reverse w-full  md:justify-evenly px-2">
        {prizes.map((item, index: number) => (
          <div
            key={index}
            className={`flex hover:bg-blue-300 px-4 py-2 mt-1 justify-between  rounded-full items-center  ${
              index === indexPrize
                ? "bg-yellow-300 font-bold"
                : "bg-gray-200 backdrop-blur-sm bg-opacity-40"
            }`}
          >
            <p>{index + 1}</p>
            <p>${item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizeContainer;
