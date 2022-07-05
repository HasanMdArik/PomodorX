import React, { useLayoutEffect } from "react";
import { primaryColors, stateNames } from "../data/data";

const TimeSteps = ({ state }: { state: number }) => {
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
          <div className="time finished work-time">
            <li>
              <p>25-min work</p>
            </li>
            <li className="progress">
              <p>25-min work</p>
            </li>
          </div>
          <div className="time active short-time">
            <li>
              <p>5-min break</p>
            </li>
            <li className="progress">
              <p>5-min break</p>
            </li>
          </div>
          <div className="time long-time">
            <li>
              <p>30-min break</p>
            </li>
            <li className="progress">
              <p>30-min break</p>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TimeSteps;
