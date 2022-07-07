import React, { useLayoutEffect, useState } from "react";
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
  const {
    timeSteps,
    runningStep,
    isPaused,
    cancelTimer,
    resumeTimer,
    pauseTimer,
    startAlarm,
    startNextStep,
  } = useMainContext();

  const [hasStepFinished, setIsStepFinished] = useState(false);

  const stepType = timeSteps[runningStep] ? timeSteps[runningStep].type : 0;

  useLayoutEffect(() => {
    const countdownElement = document.getElementById(
      "countdown"
    ) as HTMLElement;
    let timeStep = timeSteps[runningStep];
    setIsStepFinished(false);
    let countDownUpdateInterval = setInterval(() => {
      if (!isPaused) {
        // get time left
        let timeLeft =
          timeStep.stepTime -
          (Math.floor(Date.now() / 1000) - timeStep.startingTime);

        if (timeLeft === 0) {
          startAlarm();
          setIsStepFinished(true);
        }

        if (timeLeft >= 0) {
          let minLeft = Math.floor(timeLeft / 60);
          let secLeft = timeLeft % 60;
          countdownElement.innerText = `${
            minLeft < 10 ? "0" + minLeft : minLeft
          }:${secLeft < 10 ? "0" + secLeft : secLeft}`;
        } else {
          let minLeft = Math.abs(Math.ceil(timeLeft / 60));
          let secLeft = Math.abs(timeLeft % 60);
          countdownElement.innerText = `-${
            minLeft < 10 ? "0" + minLeft : minLeft
          }:${secLeft < 10 ? "0" + secLeft : secLeft}`;
        }
      }
    }, 1000);

    return () => {
      clearInterval(countDownUpdateInterval);
    };
  }, [runningStep, isPaused]);

  return (
    <div className="flex flex-col items-center secondary-color">
      <h2 className="font-extrabold text-5xl mb-3">
        {timeStepType[stepType]}
        {isPaused && " (Paused)"}
      </h2>
      <p id="countdown" className="font-bold text-9xl mb-2">
        {stepType === 0 ? "25:00" : stepType === 1 ? "05:00" : "30:00"}
      </p>
      <p className="font-medium text-4xl mb-3">
        {hasStepFinished ? "Click next to continue!" : footNote[stepType]}
      </p>
      <div className="flex">
        {hasStepFinished ? (
          <button
            onClick={() => startNextStep()}
            className="primary-bg primary-color primary-border rounded-[1.25rem] text-3xl py-1.5 px-6 mx-2"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => (isPaused ? resumeTimer() : pauseTimer())}
            className="primary-bg primary-color primary-border rounded-[1.25rem] text-3xl py-1.5 px-6 mx-2"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}

        {!hasStepFinished && (
          <button
            onClick={() => cancelTimer()}
            className="primary-bg primary-color primary-border rounded-[1.25rem] text-3xl py-1.5 px-6 mx-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Countdown;
