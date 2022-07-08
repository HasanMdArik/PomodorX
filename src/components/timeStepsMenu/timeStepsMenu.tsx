import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMainContext } from "../../contexts/mainContext";
import { primaryColors } from "../../data/data";
import { timeStepStateTypes } from "../../data/dataTypes";
import TimeStepBlock from "./timeStepBlock";

const TimeStepsMenu = ({ state }: { state: number }) => {
  const { timeSteps, loopData } = useMainContext();
  const [steps, setSteps] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const newSteps: Array<JSX.Element> = [];
    timeSteps.forEach((timeStep, index) => {
      let timePassed = 0;
      let stepState: timeStepStateTypes = timeStepStateTypes.pending;

      // See if the step is a paused step
      if (timeStep.startingTime == -2) {
        stepState = timeStepStateTypes.active;
        timePassed = timeStep.timePassedBeforePause as number;
      } else if (timeStep.startingTime != -1) {
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
    <div className="h-full w-[23.75rem] rounded-r-3xl pt-7 pl-5 relative primary-color primary-bg">
      <h2 className="mb-1 text-4xl">Time Steps</h2>
      <div
        className="mt-1 left-0 absolute primary-bg"
        style={{
          height: "3px",
          width: "80%",
          backgroundColor: primaryColors[state],
        }}
      />
      <div
        id="time-step-list-container"
        data-color={"#1e7d33"}
        className={"mt-8 font-medium "}
      >
        <ul id="time-step-list" className="text-3xl list-disc list-inside">
          {steps}
        </ul>
      </div>
    </div>
  );
};

export default TimeStepsMenu;
