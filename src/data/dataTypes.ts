type timeStep = "work" | "long" | "short";

type timeStepsData = {
  pastStepsCount: number;
  stepsCount: number;
};

interface mainContextInterface {
  stepsData: timeStepsData;
  setStepsData: React.Dispatch<React.SetStateAction<timeStepsData>>;
}

export { timeStep, timeStepsData, mainContextInterface };
