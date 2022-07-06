import React, { useEffect, useLayoutEffect } from "react";
import { useMainContext } from "../../contexts/mainContext";
import { primaryColors, stateNames } from "../../data/data";
import TimeStepBlock from "./timeStepBlock";

const TimeStepsMenu = ({ state }: { state: number }) => {
  const { stepsData } = useMainContext();

  useEffect(() => {
    console.log(stepsData);
  }, [stepsData]);

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
          <TimeStepBlock stepState={2} stepType="work" />
          <TimeStepBlock stepState={1} stepType="short" timePassed={150} />
          <TimeStepBlock stepState={0} stepType="work" />
          <TimeStepBlock stepState={0} stepType="short" />
          {/* <div className="time active work-time">
            <div>
              <li>
                <p>25-min work</p>
              </li>
            </div>
            <div className="progress">
              <li>
                <p>25-min work</p>
              </li>
            </div>
          </div> */}
        </ul>
      </div>
    </div>
  );
};

export default TimeStepsMenu;
