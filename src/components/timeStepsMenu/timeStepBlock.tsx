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

const TimeStepBlocks = ({
  stepState,
  stepType,
}: {
  stepState: 0 | 1 | 2;
  stepType: timeStep;
}) => {
  return (
    <div className={"time " + stepType + "-time" + stateClassName[stepState]}>
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

export default TimeStepBlocks;
