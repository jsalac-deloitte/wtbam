import React, { createContext, useState } from "react";

export type PlayerContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  prize: string;
  setPrize: React.Dispatch<React.SetStateAction<string>>;
  winner: boolean;
  setWinner: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PlayerContextProviderProps = {
  children: React.ReactNode;
};

export type QuestionLevelType = {
  easy: number[];
  medium: number[];
  hard: number[];
};

export const PlayerContext = createContext<PlayerContextType | null>(null);

export const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>("");
  const [prize, setPrize] = useState<string>("0.00");
  const [winner, setWinner] = useState<boolean>(false);
  return (
    <PlayerContext.Provider
      value={{ user, setUser, prize, setPrize, winner, setWinner }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
