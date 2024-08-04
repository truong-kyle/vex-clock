import React, { useState, useCallback, useEffect } from "react";
import StopWatchButton from "./StopWatchButton";
import "./StopWatch.css";

export default function StopWatch() {
  const startTime: number = 1;
  const endTime: number = 1;

  const [redTime, setRedTime] = useState(startTime);
  const [redIsRunning, setRedIsRunning] = useState(false);
  const [blueTime, setBlueTime] = useState(startTime);
  const [blueIsRunning, setBlueIsRunning] = useState(false);
  const [neutralTime, setNeutralTime] = useState(startTime);
  const [neutralIsRunning, setNeutralIsRunning] = useState(false);
  const [endGameTime, setEndGameTime] = useState(endTime);
  const [endGameRunning, setEndGameRunning] = useState(false);
  let redElapsed = startTime,
    blueElapsed = startTime,
    neutralElapsed = startTime;

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
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (redIsRunning) {
      interval = setInterval(() => {
        redElapsed = redElapsed - 1;
        setRedTime(redElapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [redIsRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (blueIsRunning) {
      interval = setInterval(() => {
        blueElapsed = blueElapsed - 1;
        setBlueTime(blueElapsed);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [blueIsRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (neutralIsRunning) {
      interval = setInterval(() => {
        neutralElapsed = neutralElapsed - 1;
        setNeutralTime(neutralElapsed);
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

  function swapNeutral() {
    setRedIsRunning(false);
    setBlueIsRunning(false);
    setNeutralIsRunning(true);
  }

  return (
    <div className="parent">
      <div className="div1">
        <h1>Noam's VEX Competition</h1>
      </div>
      <div className="div2">
        <h2>{redTime}</h2>
        <StopWatchButton name="Red" onClick={swapRed} disabled={redIsRunning || endGameRunning} />
      </div>

      <div className={"div3"}>
        {" "}
        <h2>{neutralTime}</h2>
        <StopWatchButton
          name="Neutral"
          onClick={swapNeutral}
          disabled={neutralIsRunning || endGameRunning}
        />
      </div>
      <div className="div4">
        {" "}
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
          <h2
            style={{
              color: "black",
              paddingTop: "2px",
              paddingBottom: "2px",
              paddingLeft: "20px",
              paddingRight: "20px",
              borderRadius: "9999px",
              backgroundColor: "rgb(255, 255, 255, 0.7)",
              margin: "0px",
              marginBottom: "10px",
              fontSize: "2rem"
            }}
          >
            {endGameTime}
          </h2>
        </div>
        <StopWatchButton name="Stop" onClick={stopAll} />
        <StopWatchButton name="Reset" onClick={handleReset} />
      </div>
    </div>
  );
}
