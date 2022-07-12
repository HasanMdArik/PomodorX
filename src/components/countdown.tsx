import React, { useLayoutEffect, useState } from "react";
import { useMainContext } from "../contexts/mainContext";
import { timeStepData } from "../data/dataTypes";

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
  const { timeSteps, runningStep, cancelTimer, startAlarm, startNextStep } =
    useMainContext();

  const [hasStepFinished, setHasStepFinished] = useState<boolean>();
  const [showNext, setShowNext] = useState<boolean>();

  const stepType = timeSteps[runningStep] ? timeSteps[runningStep].type : 0;

  useLayoutEffect(() => {
    const countdownElement = document.getElementById(
      "countdown"
    ) as HTMLElement;
    let timeStep = timeSteps[runningStep];
    let alarmFired = false;
    let setStepFinised = false;
    setHasStepFinished(false);

    // the coundown updating function
    const updateCountdown = () => {
      // get time left
      let timeLeft =
        timeStep.stepTime -
        (Math.floor(Date.now() / 1000) - timeStep.startingTime);

      if (timeLeft <= 3 && !alarmFired) {
        setShowNext(true);
        startAlarm();
        alarmFired = true;
      }

      if (timeLeft <= 0 && !setStepFinised) {
        setHasStepFinished(true);
        setStepFinised = true;
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
    };

    if (timeStep) {
      updateCountdown();
      let countDownUpdateInterval = setInterval(() => {
        updateCountdown();
      }, 1000);
      return () => {
        clearInterval(countDownUpdateInterval);
      };
    }
  }, [runningStep]);

  return (
    <div className="flex flex-col items-center secondary-color">
      <h2 className="font-extrabold md:text-4xl lg:text-5xl mb-0 lg:mb-3">
        {timeStepType[stepType]}
      </h2>
      <p
        id="countdown"
        className="font-bold md:text-8xl lg:text-9xl -mb-3 lg:mb-2"
      >
        --:--
      </p>
      <p className="font-medium md:text-3xl lg:text-4xl mb-0 lg:mb-3">
        {hasStepFinished ? "Click next to continue!" : footNote[stepType]}
      </p>
      <div className="flex">
        {showNext && (
          <button
            onClick={async () => {
              await startNextStep();
              setShowNext(false);
            }}
            className="primary-bg primary-color primary-border rounded-[1.25rem] md:text-2xl lg:text-3xl md:px-6 md:py-1 lg:py-1.5 lg:px-10 mx-2"
          >
            Next
          </button>
        )}
        {!hasStepFinished && (
          <button
            onClick={async () => await cancelTimer()}
            className="primary-bg primary-color primary-border rounded-[1.25rem] md:text-2xl lg:text-3xl md:px-6 md:py-1 lg:py-1.5 lg:px-10 mx-2"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Countdown;
