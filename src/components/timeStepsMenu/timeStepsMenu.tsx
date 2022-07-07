import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMainContext } from "../../contexts/mainContext";
import { primaryColors, stateNames } from "../../data/data";
import TimeStepBlock from "./timeStepBlock";

const TimeStepsMenu = ({ state }: { state: number }) => {
  const { loopData } = useMainContext();
  const [steps, setSteps] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const timeSteps: Array<JSX.Element> = [];

    for (let i = 1; i <= loopData.loopCount * 2; i++) {
      timeSteps.push(
        <TimeStepBlock
          key={i}
          stepState={0}
          stepType={i % 2 != 0 ? "work" : (i / 2) % 4 == 0 ? "long" : "short"}
          isNew={i > loopData.pastLoopCount * 2} //? steps are twice than loops
        />
      );
    }
    setSteps(timeSteps);
  }, [loopData]);

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
        className={"mt-8 font-medium " + stateNames[state]}
      >
        <ul id="time-step-list" className="text-3xl list-disc list-inside">
          {steps}
        </ul>
      </div>
    </div>
  );
};

export default TimeStepsMenu;