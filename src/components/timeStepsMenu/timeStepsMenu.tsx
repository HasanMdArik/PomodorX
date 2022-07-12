import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMainContext } from "../../contexts/mainContext";
import { primaryColors } from "../../data/data";
import { timeStepStateTypes } from "../../data/dataTypes";
import TimeStepBlock from "./timeStepBlock";

const TimeStepsMenu = () => {
  const { timeSteps, loopData, state } = useMainContext();
  const [steps, setSteps] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const newSteps: Array<JSX.Element> = [];
    timeSteps.forEach((timeStep, index) => {
      let timePassed = 0;
      let stepState: timeStepStateTypes = timeStepStateTypes.pending;

      // See if the step is a paused step
      if (timeStep.startingTime != -1) {
        let timeNow = Math.floor(Date.now() / 1000);
        timePassed = timeNow - timeStep.startingTime;
        // Setting the time step depending on timePassed vs step's time
        if (timePassed >= timeStep.stepTime) {
          stepState = timeStepStateTypes.finished;
        } else {
          stepState = timeStepStateTypes.active;
        }
      }

      newSteps.push(
        <TimeStepBlock
          stepState={stepState}
          stepType={timeStep.type}
          timePassed={timePassed}
          isNew={index + 1 > loopData.pastLoopCount * 2}
          index={index}
          key={index}
        />
      );
    });

    setSteps(newSteps);
  }, [timeSteps]);

  useLayoutEffect(() => {
    let viewPortHeight = window.innerHeight;
    let timeStepList = document.getElementById("time-step-list-container");
    if (timeStepList) {
      let pos = timeStepList.getBoundingClientRect();
      timeStepList.style.height = (viewPortHeight - pos.top).toString() + "px";
    }
  }, []);

  return (
    <div className="h-full w-screen md:w-[20.625rem] lg:w-[23.75rem] rounded-l-3xl md:rounded-l-none rounded-r-3xl pt-4 md:pt-7 pl-3 lg:pl-7 relative primary-color primary-bg">
      <h2 className="mb-1 text-4xl text-center md:text-left">Time Steps</h2>
      <div
        className="mt-1 h-[3px] w-full md:w-4/5 left-0 absolute primary-bg"
        style={{
          backgroundColor: primaryColors[state],
        }}
      />
      <div
        id="time-step-list-container"
        data-color={"#1e7d33"}
        className="mt-3 md:mt-5 lg:mt-8 font-medium"
      >
        <ul className="flex flex-col h-fit md:block items-center text-3xl list-disc list-inside">
          {steps}
        </ul>
      </div>
    </div>
  );
};

export default TimeStepsMenu;
