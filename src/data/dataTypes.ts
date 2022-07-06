type timeStep = "work" | "long" | "short";

type timeStepsData = {
  pastStepsCount: number;
  stepsCount: number;
};

interface mainContextInterface {
  runningStep: number;
  setRunningStep: React.Dispatch<React.SetStateAction<number>>;
  stepsData: timeStepsData;
  setStepsData: React.Dispatch<React.SetStateAction<timeStepsData>>;
}

export { timeStep, timeStepsData, mainContextInterface };
