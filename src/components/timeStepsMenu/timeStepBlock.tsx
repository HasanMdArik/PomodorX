import React from "react";
import {
  timeStepStateClassNames,
  timePeriods,
  stateBasedClassName,
} from "../../data/data";
import { timeStepStateTypes, timeStepTypes } from "../../data/dataTypes";

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
  stepState: timeStepStateTypes;
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
        (isNew ? " " + stateBasedClassName[stepType + 1] + " new" : "")
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
