import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import "../../static/css/index.css";

const App = () => {
  return (
    <div className="center">
      <HomePage />
    </div>
  );
};

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);
