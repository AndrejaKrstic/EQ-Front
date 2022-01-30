import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LevelSelect({ selektujLevel, vezbanjeID }) {
  let level;
  let navigate = useNavigate();
  function handleLevel(number) {
    level = number;
    console.log(level);
    selektujLevel(level);
    console.log(vezbanjeID);
    switch (vezbanjeID) {
      case 1:
        navigate("/vezbanje-roda");
        break;
      case 2:
        navigate("/vezbanje-prevoda");
        break;
    }
  }

  return (
    <>
      <div className="div-levels" id="div-levels">
        <div id="level-1">
          <button className="button-level" onClick={() => handleLevel(1)}>
            Nivo 1
          </button>
        </div>
        <div id="level-2">
          <button className="button-level" onClick={() => handleLevel(2)}>
            Nivo 2
          </button>
        </div>
        <div id="level-3">
          <button className="button-level" onClick={() => handleLevel(3)}>
            Nivo 3
          </button>
        </div>
        <div id="level-4">
          <button className="button-level" onClick={() => handleLevel(4)}>
            Nivo 4
          </button>
        </div>
        <div id="level-5">
          <button className="button-level" onClick={() => handleLevel(5)}>
            Nivo 5
          </button>
        </div>
        <div id="level-6">
          <button className="button-level" onClick={() => handleLevel(6)}>
            Nivo 6
          </button>
        </div>
        <div id="level-7">
          <button className="button-level" onClick={() => handleLevel(7)}>
            Nivo 7
          </button>
        </div>
        <div id="level-8">
          <button className="button-level" onClick={() => handleLevel(8)}>
            Nivo 8
          </button>
        </div>
      </div>
    </>
  );
}

export default LevelSelect;
