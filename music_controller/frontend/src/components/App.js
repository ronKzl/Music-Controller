import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import "../../static/css/index.css";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

const App = () => {
  return (
    <div className="center">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);
