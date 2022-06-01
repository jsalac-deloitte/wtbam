import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlayerContext } from "../Context/PlayerContext";

const EndGame: React.FC = () => {
  const playerContext = useContext(PlayerContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 8000);
  });

  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="flex items-center justify-center h-full max-h-96 w-full max-w-3xl bg-gray-400 backdrop-blur-sm bg-opacity-10 rounded-xl">
        {/* lose */}
        <div
          className={`w-full h-auto space-y-6 ${
            playerContext?.winner ? "hidden" : "block"
          }`}
        >
          <h1 className="text-center text-2xl text-orange-200">
            Thank you for Playing!
          </h1>
          <h2 className="text-center font-bold font-luckiest-guy text-4xl text-white">
            You earned {playerContext?.prize}
          </h2>
        </div>
        {/* win */}
        <div
          className={`w-full h-auto bg-purple-400 space-y-6 ${
            playerContext?.winner ? "block" : "hidden"
          }`}
        >
          <h1 className="text-center text-2xl text-purple-200">
            Congratulations!
          </h1>
          <h2 className="text-center font-bold font-luckiest-guy text-4xl text-white">
            You won {playerContext?.prize} !!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default EndGame;
