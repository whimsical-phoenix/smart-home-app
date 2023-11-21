// Locks.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const Locks = ({ door }) => {
  const [lockState, setLockState] = useState("");

  useEffect(() => {
    // Fetch lock state from Home Assistant API
    axios
      .get(`https://your-home-assistant-instance/api/states/lock.${door}_lock`)
      .then((response) => {
        setLockState(response.data.state);
      });
  }, [door]);

  const toggleLock = () => {
    // Toggle the state of the lock using Home Assistant API
    axios.post(
      `https://your-home-assistant-instance/api/services/lock/toggle`,
      {
        entity_id: `lock.${door}_lock`,
      }
    );
  };

  return (
    <div className={`locks-container ${door}  card`}>
      <h2>{door} Lock</h2>
      <p>Lock State: {lockState}</p>
      <button onClick={toggleLock}>Toggle Lock</button>
    </div>
  );
};

export default Locks;
