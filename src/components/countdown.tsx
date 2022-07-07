import React, { useState } from "react";
import { useMainContext } from "../contexts/mainContext";

// The time-step type name
const timeStepType = ["Work Time", "Short Break", "Long Break"];
// Footnote depending on the step type
const footNote = [
  "Time to focus!",
  "Do something enjoying!",
  "Do something relaxing!",
];
// Footnotes after the step finished

const Countdown = () => {
  const { isPaused, cancelTimer, runningStep, resumeTimer, pauseTimer } =
    useMainContext();

  const stepIndex =
    (runningStep + 1) % 2 != 0 ? 0 : (runningStep + 1) % 4 == 0 ? 2 : 1;

  return (
    <div className="flex flex-col items-center secondary-color">
      <h2 className="font-extrabold text-5xl mb-3">
        {timeStepType[stepIndex]}
        {isPaused && " (Paused)"}
      </h2>
      <p className="font-bold text-9xl mb-2">12 : 25</p>
      <p className="font-medium text-4xl mb-3">{footNote[stepIndex]}</p>
      <div className="flex">
        {isPaused ? (
          <button
            onClick={() => resumeTimer()}
            className="primary-bg primary-color primary-border rounded-[1.25rem] text-3xl py-1.5 px-6 mx-2"
          >
            Resume
          </button>
        ) : (
          <button
            onClick={() => pauseTimer()}
            className="primary-bg primary-color primary-border rounded-[1.25rem] text-3xl py-1.5 px-6 mx-2"
          >
            Pause
          </button>
        )}
        <button
          onClick={() => cancelTimer()}
          className="primary-bg primary-color primary-border rounded-[1.25rem] text-3xl py-1.5 px-6 mx-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Countdown;
