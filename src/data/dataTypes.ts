type timeStep = "work" | "long" | "short";

type loopData = {
  pastLoopCount: number;
  loopCount: number;
};

interface mainContextInterface {
  runningTimeStepStartingTime: number;
  runningTimeStep: number;
  loopData: loopData;
  setLoopData: React.Dispatch<React.SetStateAction<loopData>>;
  cancelTimer: Function;
}

export { timeStep, loopData, mainContextInterface };
