import React, { useState, useEffect, useCallback } from "react";
import StopWatchButton from "./StopWatchButton";
import "./StopWatch.css";

export default function StopWatch() {
  const startTime = 120;
  const endTime = 20;

  const [redTime, setRedTime] = useState(startTime);
  const [redIsRunning, setRedIsRunning] = useState(false);
  const [blueTime, setBlueTime] = useState(startTime);
  const [blueIsRunning, setBlueIsRunning] = useState(false);
  const [neutralTime, setNeutralTime] = useState(startTime);
  const [neutralIsRunning, setNeutralIsRunning] = useState(false);
  const [endGameTime, setEndGameTime] = useState(endTime);
  const [endGameRunning, setEndGameRunning] = useState(false);

  const handleReset = useCallback(() => {
    stopAll();
    setEndGameTime(endTime);
    setRedTime(startTime);
    setBlueTime(startTime);
    setNeutralTime(startTime);
  }, []);

  const stopAll = () => {
    setRedIsRunning(false);
    setBlueIsRunning(false);
    setNeutralIsRunning(false);
    setEndGameRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (redIsRunning) {
      interval = setInterval(() => {
        setRedTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [redIsRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (blueIsRunning) {
      interval = setInterval(() => {
        setBlueTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [blueIsRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (neutralIsRunning) {
      interval = setInterval(() => {
        setNeutralTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [neutralIsRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (endGameRunning) {
      interval = setInterval(() => {
        setEndGameTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [endGameRunning]);

  useEffect(() => {
    if (redTime <= 0 || blueTime <= 0 || neutralTime <= 0) {
      setEndGameRunning(true);
      setRedIsRunning(false);
      setBlueIsRunning(false);
      setNeutralIsRunning(false);
    }
  }, [redTime, blueTime, neutralTime]);

  useEffect(() => {
    if (endGameTime <= 0) {
      setEndGameRunning(false);
    }
  }, [endGameTime]);

  const swapRed = () => {
    setBlueIsRunning(false);
    setNeutralIsRunning(false);
    setRedIsRunning(true);
  };

  const swapBlue = () => {
    setRedIsRunning(false);
    setNeutralIsRunning(false);
    setBlueIsRunning(true);
  };

  const swapNeutral = () => {
    setRedIsRunning(false);
    setBlueIsRunning(false);
    setNeutralIsRunning(true);
  };

  return (
    <div className="parent">
      {/* <div className="div1">
        <h1 style={{verticalAlign: "middle"}}>Noam's </h1>
        <img
          src="https://robotics.nasa.gov/wp-content/uploads/2020/04/vex_robotics_logo.png"
          width={"100px"}
          height={"50px"}
        ></img>
        <h1> Competition</h1>
      </div> */}
      <div className="div2">
        <h2>{redTime}</h2>
        <StopWatchButton
          name="Red"
          onClick={swapRed}
          disabled={redIsRunning || endGameRunning}
        />
      </div>
      <div className="div3">
        <h2>{neutralTime}</h2>
        <StopWatchButton
          name="Neutral"
          onClick={swapNeutral}
          disabled={neutralIsRunning || endGameRunning}
        />
      </div>
      <div className="div4">
        <h2>{blueTime}</h2>
        <StopWatchButton
          name="Blue"
          onClick={swapBlue}
          disabled={blueIsRunning || endGameRunning}
        />
      </div>
      <div
        style={{
          backgroundColor:
            endGameTime === 0
              ? "#ff1900"
              : endGameRunning
              ? "#f6e515"
              : "#31a222",
        }}
        className="div5"
      >
        <div
          style={{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <h2 className="timer">{endGameTime}</h2>
        </div>
        <StopWatchButton
          name="Stop"
          disabled={
            !(
              endGameRunning ||
              redIsRunning ||
              blueIsRunning ||
              neutralIsRunning
            )
          }
          onClick={stopAll}
        />
        <StopWatchButton
          name="Reset"
          disabled={
            endGameRunning || redIsRunning || blueIsRunning || neutralIsRunning
          }
          onClick={handleReset}
        />
      </div>
    </div>
  );
}
