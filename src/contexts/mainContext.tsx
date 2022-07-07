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

  //? The variable that tells the countdown if timer is paused or not
  const [isPaused, setIsPaused] = useState(false);

  //? The internal variable to store timeout data for cancelling it
  const [timeoutData, setTimeoutData] = useState<NodeJS.Timeout>();

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
      let newTimeoutData = setTimeout(() => {
        startAlarm();
      }, stepTime * 1000); // stepTime is in seconds and setTimeout requires millisecond value
      // 4. Update the states
      setTimeoutData(newTimeoutData);
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
  const cancelTimer = () => {
    // Turn all states to default(except the state as that is handled by a useEffect func)
    setLoopData({
      loopCount: 0,
      pastLoopCount: 0,
    });
    setRunningStep(-1);
    setTimeSteps([]);
    setTimeoutData(undefined);
  };

  //? The function to pause the timer
  const pauseTimer = () => {
    // 1. Cancel the timer
    clearTimeout(timeoutData);
    // 2. change the step's data so that it works fine after resuming
    let newTimeSteps = [...timeSteps]; // Can't directly reference cause arrays are referenced by address
    let passedTime =
      Math.floor(Date.now() / 1000) - newTimeSteps[runningStep].startingTime;
    console.log(
      Math.floor(Date.now() / 1000),
      newTimeSteps[runningStep].startingTime,
      passedTime
    );
    newTimeSteps[runningStep].timePassedBeforePause = passedTime;
    newTimeSteps[runningStep].startingTime = -2; // -2 is a special value that indicates the step is paused

    // 3. set isPaused to true and set timeSteps to new value
    setIsPaused(true);
    setTimeSteps(newTimeSteps);
  };

  //? The function to resume the timer
  const resumeTimer = () => {
    // 1. get data about the step
    let timeStep = timeSteps[runningStep];
    let timeLeft =
      timeStep.stepTime - (timeStep.timePassedBeforePause as number); // we can surely tell that it's not undefined
    console.log(timeLeft);
    // 2. update the startingTime of the running step
    //? We have to subsract timePassedBeforePause with the current time.
    //? So that, the percentage of the time step menu remains correct
    const newTimeSteps = [...timeSteps];
    newTimeSteps[runningStep].startingTime =
      Math.floor(Date.now() / 1000) -
      (timeStep.timePassedBeforePause as number); // again, we can surely tell that it's not undefined
    newTimeSteps[runningStep].timePassedBeforePause = undefined;

    // 3. restart the setTimeout func
    let newTimeoutData = setTimeout(() => {
      startAlarm();
    }, timeLeft * 1000); // timeLeft is in seconds and setTimeout requires millisecond value

    // 4. Update the states and set isPaused to false
    setIsPaused(false);
    setTimeSteps(newTimeSteps);
    setTimeoutData(newTimeoutData);
  };

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
    newTimeSteps[newRunningStep].startingTime = Math.floor(Date.now() / 1000);

    // 3. Update the states
    setRunningStep(newRunningStep);
    setTimeSteps(newTimeSteps);
  };

  const contextValues: mainContextInterface = {
    loopData,
    runningStep,
    isPaused,
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
