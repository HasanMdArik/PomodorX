import React, { ReactNode, useContext, useEffect, useState } from "react";
import {
  mainContextInterface,
  loopData,
  timeStepData,
} from "../data/dataTypes";

const MainContext = React.createContext({} as mainContextInterface);

export const useMainContext = () => {
  return useContext(MainContext);
};

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  //? The state variable defines the state of the app
  // 0 stands for timer not started
  // 1 stands for work time
  // 2 stands for short break
  // 3 stands for long break
  const [state, setState] = useState(0);
  //? The loopData will be used to get loop-count from loopInput.tsx
  const [loopData, setLoopData] = useState<loopData>({
    loopCount: 0,
    pastLoopCount: 0,
  });
  //? The running step indicates the index of currently running step
  const [runningStep, setRunningStep] = useState(-1);

  //? The timeSteps state will be used by timeStepMenu.tsx and countdown.tsx
  const [timeSteps, setTimeSteps] = useState<Array<timeStepData>>([]);

  //* The UseEffect Functions to look for updates

  //* The other functions
  //? The function to cancel the timer
  const cancelTimer = () => {};

  //? The function to pause the timer
  const pauseTimer = () => {};

  //? The function to resume the timer
  const resumeTimer = () => {};

  //? The function to start the next step from the steps
  const startNextStep = () => {};

  const contextValues: mainContextInterface = {
    loopData,
    runningStep,
    state,
    timeSteps,
    setLoopData,
    cancelTimer,
    pauseTimer,
    resumeTimer,
    startNextStep,
  };
  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
