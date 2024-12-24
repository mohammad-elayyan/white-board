import { useState } from "react";
import "./App.css";
import Forms from "./components/Forms/Index";
import { Route, Routes } from "react-router-dom";
import RoomPage from "./pages/RoomPage/Index";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/:roomId" element={<RoomPage />} />
      </Routes>
    </div>
  );
};

export default App;
