import React, { useEffect, useLayoutEffect, useState } from "react";
import { useMainContext } from "../../contexts/mainContext";
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
  index,
}: {
  stepState: timeStepStateTypes;
  stepType: timeStepTypes;
  timePassed: number;
  isNew: boolean;
  index: any;
}) => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setTime((timePeriods[stepType] - timePassed).toString() + "s");
  }, [timePassed]);

  return (
    <div
      style={
        {
          "--time": time,
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
      <div className="progress">
        <li>
          <p>{stepContents[stepType]}</p>
        </li>
      </div>
    </div>
  );
};

export default TimeStepBlock;
