import { QuestionType } from "../config/types";

type PrizeProps = {
  prizes: QuestionType[];
  currentPrize: number;
};

const PrizeContainer: React.FC<PrizeProps> = ({
  prizes,
  currentPrize = 1000,
}) => {
  return (
    <div className=" hidden md:flex flex-col w-[250px] justify-evenly ">
      <div>
        <img
          src="./assets/wtbm logo.png"
          alt="WTBM Logo"
          className="object-scale-down"
        />
      </div>
      <div className="flex flex-col-reverse">
        {prizes.map((item: QuestionType, index: number) => (
          <div
            key={index}
            className={`flex hover:bg-blue-300 px-4 py-2 mt-1 justify-between  rounded-full items-center  ${
              item.prize === currentPrize
                ? "bg-yellow-300 font-bold"
                : "bg-gray-200 backdrop-blur-sm bg-opacity-40"
            }`}
          >
            <p>{index + 1}</p>
            <p>${item.prize.toLocaleString("en-US")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizeContainer;
