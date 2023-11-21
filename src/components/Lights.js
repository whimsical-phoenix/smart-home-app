// Lights.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const Lights = ({ room }) => {
  const [lightState, setLightState] = useState("");

  useEffect(() => {
    // Fetch light state from Home Assistant API
    axios
      .get(
        `https://your-home-assistant-instance/api/states/light.${room}_light`
      )
      .then((response) => {
        setLightState(response.data.state);
      });

    // Subscribe to sunset and sunrise events for automatic control
    axios
      .post(`https://your-home-assistant-instance/api/states/sun.sun`, {})
      .then((response) => {
        const sunsetTime = new Date(response.data.attributes.next_setting);

        // Calculate time until sunset in milliseconds
        const timeUntilSunset = sunsetTime - new Date();

        // Set timeout to turn on the light at sunset
        setTimeout(() => {
          axios.post(
            `https://your-home-assistant-instance/api/services/light/turn_on`,
            {
              entity_id: `light.${room}_light`,
            }
          );
        }, timeUntilSunset);

        // Set timeout to turn off the light at sunrise
        setTimeout(() => {
          axios.post(
            `https://your-home-assistant-instance/api/services/light/turn_off`,
            {
              entity_id: `light.${room}_light`,
            }
          );
        }, timeUntilSunset + 10000); // Adding a small delay for illustration, adjust as needed
      });
  }, [room]);

  return (
    <div className={`lights-container ${room}  card`}>
      <h2>{room} Lights</h2>
      <p>Light State: {lightState}</p>
    </div>
  );
};

export default Lights;
