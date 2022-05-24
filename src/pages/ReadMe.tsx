import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputText from "../components/InputText";
import { useContext } from "react";
import { PlayerContext } from "../Context/PlayerContext";

type ReadMeProps = {};
const ReadMe: React.FC<ReadMeProps> = () => {
  const playerContext = useContext(PlayerContext);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();
  const letsPlay = () => {
    playerContext?.setUser(name);
    navigate("/play");
  };

  return (
    <div className="px-4  grow flex flex-col justify-around ">
      <div className="flex justify-center  items-center px-2 ">
        <img
          src="./assets/wtbm logo.png"
          alt="WTBM Logo"
          className="object-scale-down h-[250px]"
        />
      </div>
      <div className="text-white">
        <h2 className="font-bold">Instructions</h2>
        <p className="text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint,
          cupiditate. Exercitationem, numquam doloremque eos libero ullam
          consequuntur itaque alias ea fuga maiores? Quibusdam molestiae ipsum
          consequatur, quos rerum placeat accusantium?
        </p>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="name" className="text-white">
          My name is
        </label>
        <InputText
          name="name"
          placeholder="Enter your name here.."
          additionalAttributes={{
            className: "px-2 py-2 rounded-lg text-center",
          }}
          handleChange={(event) => setName(event.target.value)}
        />
      </div>
      <Button
        label="Let's Play!"
        handleClick={letsPlay}
        additionalAttributes={{
          className:
            "bg-gradient-to-r from-cyan-500 to-blue-500 px-2 py-4 w-full rounded-lg text-white font-luckiest-guy tracking-widest text-[40px]",
        }}
      />
    </div>
  );
};

export default ReadMe;
