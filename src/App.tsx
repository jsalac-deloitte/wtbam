import React from "react";
import "./App.css";
import { PlayerContextProvider } from "./Context/PlayerContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import ReadMe from "./pages/ReadMe";
import GamePlay from "./pages/GamePlay";
import WtbamVideo from "./pages/WtbamVideo";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PlayerContextProvider>
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route index element={<ReadMe />} />
            <Route path="/play" element={<GamePlay />} />
            <Route path="/video" element={<WtbamVideo />} />
          </Route>
        </Routes>
      </PlayerContextProvider>
    </BrowserRouter>
  );
};

export default App;
