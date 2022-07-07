import React, { ReactNode, useContext, useEffect, useState } from "react";
import { timePeriods } from "../data/data";
import {
  mainContextInterface,
  loopData,
  timeStepData,
  timeStepTypes,
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
  //? The useEffect funtion to create timeSteps from loopCount
  useEffect(() => {
    const newTimeSteps: Array<timeStepData> = [];
    let stepsCount = loopData.loopCount * 2; // each loop contains one work step and another break step
    for (let i = 1; i <= stepsCount; i++) {
      let type: timeStepTypes =
        i % 2 != 0
          ? timeStepTypes.work
          : i % 8 != 0
          ? timeStepTypes.short
          : timeStepTypes.long;
      let stepTime = timePeriods[type];
      newTimeSteps.push({
        startingTime: -1,
        stepTime,
        type,
      });
    }
    setTimeSteps(newTimeSteps);
  }, [loopData]);

  //? The useEffect function to update state with new runningSteps
  //? It also fires the alarm function
  useEffect(() => {
    if (runningStep == -1) {
      setState(0);
    } else {
      // 1. calculate the new state
      // Need to add one with the runningStep for calculations, because it is an index
      const newState =
        (runningStep + 1) % 2 != 0 ? 1 : (runningStep + 1) % 8 != 0 ? 2 : 3;
      // 2. Derive time of the new step from state-number
      const stepTime = timePeriods[newState - 1];
      // 3. Start the setTimeout function for for firing the startAlarm function
      setTimeout(() => {
        startAlarm();
      }, stepTime * 1000); // stepTime is in seconds and setTimeout requires millisecond value
      setState(newState);
    }
  }, [runningStep]);

  //* Private functions
  const startAlarm = () => {
    console.log("Current time step ended");
    // Start the alarm
  };

  //* The other functions
  //? The function to cancel the timer
  const cancelTimer = () => {};

  //? The function to pause the timer
  const pauseTimer = () => {};

  //? The function to resume the timer
  const resumeTimer = () => {};

  //? The function to start the next step from the steps
  //? it also updates the steps with required data
  const startNextStep = () => {
    // Check if all time steps are finished
    if (runningStep + 1 == timeSteps.length) {
      // if finished return to default screen
      setState(0);
      setTimeSteps([]);
      setRunningStep(-1);
      return;
    }
    // If time steps left to be done,
    // 1. update runningStep
    let newRunningStep = runningStep + 1;
    // 2. update the new step with data
    let newTimeSteps = [...timeSteps];
    newTimeSteps[newRunningStep].startingTime = Date.now();

    // 3. Update the states
    setRunningStep(newRunningStep);
    setTimeSteps(newTimeSteps);
  };

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
