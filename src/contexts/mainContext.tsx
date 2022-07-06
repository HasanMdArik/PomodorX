import React, { ReactNode, useContext, useEffect, useState } from "react";
import { mainContextInterface, loopData } from "../data/dataTypes";

const MainContext = React.createContext({} as mainContextInterface);

export const useMainContext = () => {
  return useContext(MainContext);
};

const MainContextProvider = ({
  children,
  setState,
}: {
  children: ReactNode;
  setState: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [runningTimeStep, setRunningTimeStep] = useState(0);
  const [runningTimeStepStartingTime, setRunningTimeStepStartingTime] =
    useState(-1); //? This value is used to pass the time of when current step started if the app reloads meanwhile
  const [loopData, setLoopData] = useState<loopData>({
    pastLoopCount: 0,
    loopCount: 0,
  });
  // TODO Initial data processing to be done here from the saved data at localstorage

  // Saves updates to tackle reloads
  useEffect(() => {
    localStorage.setItem("runningStepTime", runningTimeStep.toString());
    localStorage.setItem(
      "runningTimeStepStartingTime",
      runningTimeStepStartingTime.toString()
    );
    localStorage.setItem("loopCount", loopData.loopCount.toString());
  }, [runningTimeStep, loopData, runningTimeStepStartingTime]);

  const cancelTimer = () => {
    setLoopData({
      pastLoopCount: 0,
      loopCount: 0,
    });
    setRunningTimeStep(0);
    setRunningTimeStepStartingTime(-1);
    setState(0);
  };

  const startNextStep = () => {};

  const contextValues: mainContextInterface = {
    runningTimeStepStartingTime,
    runningTimeStep,
    loopData,
    setLoopData,
    cancelTimer,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
