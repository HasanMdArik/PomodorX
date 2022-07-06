import React from "react";
import { timeStep } from "../../data/dataTypes";

// classNames depending on the stepState value
// if stepState is 0, it means nor active nor finished (means pending)
// if stepState is 1, it means active
// if stepState is 2, it means finished
const stateClassName = ["", " active", " finished"];

// The block's statements depending on types
const stepContents: { [key: string]: string } = {
  work: "25-min work",
  short: "5-min break",
  long: "30-min break",
};

// The time period(seconds) depending on types
const timeOfTypes: { [key: string]: number } = {
  work: 1500,
  short: 300,
  long: 1800,
};

const TimeStepBlock = ({
  stepState,
  stepType,
  timePassed = 0,
  isNew = false,
}: {
  stepState: 0 | 1 | 2;
  stepType: timeStep;
  timePassed?: number;
  isNew?: boolean;
}) => {
  return (
    <div
      style={
        {
          "--time": (timeOfTypes[stepType] - timePassed).toString() + "s",
        } as any
      }
      className={
        "time" +
        stateClassName[stepState] +
        (isNew ? " " + stepType + " new" : "")
      }
    >
      <div>
        <li>
          <p>{stepContents[stepType]}</p>
        </li>
      </div>
      <div
        style={
          stepState == 1
            ? {
                width:
                  ((timePassed * 100) / timeOfTypes[stepType]).toString() + "%",
              }
            : {}
        }
        className="progress"
      >
        <li>
          <p>{stepContents[stepType]}</p>
        </li>
      </div>
    </div>
  );
};

export default TimeStepBlock;
