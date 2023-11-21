// Thermostat.js

import React, { useState, useEffect } from "react";
import axios from "axios";
// import "styles.css"; // Import your styles

const Thermostat = ({ room }) => {
  const [thermostat, setThermostat] = useState({ temperature: 20, unit: "C" });

  useEffect(() => {
    // Fetch thermostat data from Home Assistant API
    axios
      .get(
        `https://your-home-assistant-instance/api/states/climate.${room}_thermostat`
      )
      .then((response) => {
        setThermostat(response.data.attributes);
      });
  }, [room]);

  const adjustTemperature = (amount) => {
    const newTemperature = thermostat.temperature + amount;
    if (newTemperature >= 16 && newTemperature <= 30) {
      // Adjust thermostat temperature using Home Assistant API
      axios.post(
        `https://your-home-assistant-instance/api/services/climate/set_temperature`,
        {
          entity_id: `climate.${room}_thermostat`,
          temperature: newTemperature,
        }
      );
    }
  };

  const toggleUnit = () => {
    // Toggle thermostat unit between Celsius and Fahrenheit using Home Assistant API
    const newUnit = thermostat.unit === "C" ? "F" : "C";
    axios.post(
      `https://your-home-assistant-instance/api/services/climate/set_temperature`,
      {
        entity_id: `climate.${room}_thermostat`,
        target_temp_high: thermostat.target_temp_high, // Maintain existing values
        target_temp_low: thermostat.target_temp_low,
        hvac_mode: thermostat.hvac_mode,
        unit_of_measurement: newUnit,
      }
    );
  };

  return (
    <div className={`thermostat-container ${room} card`}>
      <h2>{room} Thermostat</h2>
      <div className="temperature-container">
        <button className="arrow-button" onClick={() => adjustTemperature(-1)}>
          &#9660; {/* Down arrow */}
        </button>
        <p className="temperature">
          {thermostat.temperature}&deg;{thermostat.unit}
        </p>
        <button className="arrow-button" onClick={() => adjustTemperature(1)}>
          &#9650; {/* Up arrow */}
        </button>
      </div>
      <div>
        <label>
          Fahrenheit
          <input
            type="checkbox"
            checked={thermostat.unit === "F"}
            onChange={toggleUnit}
          />
        </label>
      </div>
    </div>
  );
};

export default Thermostat;
