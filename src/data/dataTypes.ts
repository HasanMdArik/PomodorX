type timeStep = "work" | "long" | "short";

type timeStepsData = {
  pastLoopCount: number;
  stepsArray: Array<timeStep>;
};

interface mainContextInterface {
  stepsData: timeStepsData;
  setStepsData: React.Dispatch<React.SetStateAction<timeStepsData>>;
}

export { timeStep, timeStepsData, mainContextInterface };
