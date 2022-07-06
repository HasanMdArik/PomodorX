import React, { ReactNode, useContext, useState } from "react";
import { mainContextInterface, timeStepsData } from "../data/dataTypes";

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
  const [runningStep, setRunningStep] = useState(0);

  const [stepsData, setStepsData] = useState<timeStepsData>({
    pastStepsCount: 0,
    stepsCount: 0,
  });
  // TODO Initial data processing to be done here from the saved data at localstorage

  const cancelTimer = () => {
    setStepsData({
      pastStepsCount: 0,
      stepsCount: 0,
    });
    setRunningStep(0);
    setState(0);
  };

  const contextValues: mainContextInterface = {
    runningStep,
    setRunningStep,
    stepsData,
    setStepsData,
    cancelTimer,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
