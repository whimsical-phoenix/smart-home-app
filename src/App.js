// App.js

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Lights from "./components/Lights";
import Thermostat from "./components/Thermostat";
import Locks from "./components/Locks";

import "./styles.css"; // Import the styles
const App = () => {
  return (
    <div className="container">
      <Lights room="Living Room" />
      <Lights room="Bedroom" />
      <Lights room="Kitchen" />
      <Lights room="Bathroom" />
      <Thermostat room="Thermostat" />

      <Locks door="Front Door" />
    </div>
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
