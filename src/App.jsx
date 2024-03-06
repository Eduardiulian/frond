import { Routes, Route, Navigate } from 'react-router-dom';
import Play from './pages/play/play';
import GameContext from './gameContext';
import { useState } from "react";

function App() {
  const [Username, setUsername] = useState("anonymous");
  const [Gamestarted, setGamestarted] = useState(false);

  return (
    <GameContext.Provider value={{ Gamestarted, Username, setUsername, setGamestarted }}>
      <Routes>
        <Route path="/" exact element={<Play />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </GameContext.Provider>
  );
}

export default App;