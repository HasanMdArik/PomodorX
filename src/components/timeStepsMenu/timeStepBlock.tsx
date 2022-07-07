import React from "react";
import { timeStepStateClassNames, timePeriods } from "../../data/data";
import { timeStepTypes } from "../../data/dataTypes";

// The block's statements depending on types
const stepContents: Array<string> = [
  "25-min work",
  "5-min break",
  "30-min break",
];

const TimeStepBlock = ({
  stepState,
  stepType,
  timePassed = 0,
  isNew = false,
}: {
  stepState: 0 | 1 | 2;
  stepType: timeStepTypes;
  timePassed?: number;
  isNew?: boolean;
}) => {
  return (
    <div
      style={
        {
          "--time": (timePeriods[stepType] - timePassed).toString() + "s",
        } as any
      }
      className={
        "time" +
        timeStepStateClassNames[stepState] +
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
                  ((timePassed * 100) / timePeriods[stepType]).toString() + "%",
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
