import React, { createContext, useState } from "react";

export type PlayerContextType = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [user, setUser] = useState<string | null>("Hero 2");
  return (
    <PlayerContext.Provider value={{ user, setUser }}>
      {children}
    </PlayerContext.Provider>
  );
};
