import React, { useLayoutEffect } from "react";
import { componentBackgrounds, primaryColors } from "../data/data";

const states = ["idle", "work", "short", "long"];

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
    <div
      style={{
        background: componentBackgrounds[state],
        color: primaryColors[state],
      }}
      className="h-full w-[25rem]  rounded-r-3xl pt-7 pl-5 relative"
    >
      <h2 className="mb-1 text-4xl">Time Steps</h2>
      <div
        className="mt-1 left-0 absolute"
        style={{
          height: "3px",
          width: "80%",
          background: primaryColors[state],
        }}
      />
      <div
        id="time-step-list-container"
        data-color={"#1e7d33"}
        className={"mt-8 " + states[state]}
      >
        <ul id="time-step-list" className="text-3xl list-disc list-inside">
          <li>
            <p>25-min work</p>
          </li>
          <li>
            <p>5-min break</p>
          </li>
          <li>
            <p>25-min work</p>
          </li>
          <li>
            <p>5-min break</p>
          </li>
          <li>
            <p>25-min work</p>
          </li>
          <li>
            <p>5-min break</p>
          </li>
          <li>
            <p>25-min work</p>
          </li>
          <li>
            <p>30-min break</p>
          </li>
          <li>
            <p>25-min work</p>
          </li>
          <li>
            <p>5-min break</p>
          </li>
          <li>
            <p>25-min work</p>
          </li>
          <li>
            <p>5-min break</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TimeSteps;
