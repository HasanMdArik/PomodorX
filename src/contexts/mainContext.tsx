import React, { ReactNode, useContext, useState } from "react";
import { mainContextInterface, timeStepsData } from "../data/dataTypes";

const MainContext = React.createContext({} as mainContextInterface);

export const useMainContext = () => {
  return useContext(MainContext);
};

const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [runningStep, setRunningStep] = useState(0);

  const [stepsData, setStepsData] = useState<timeStepsData>({
    pastStepsCount: 0,
    stepsCount: 0,
  });
  // Initial data processing to be done here from the saved data at localstorage

  const contextValues: mainContextInterface = {
    runningStep,
    setRunningStep,
    stepsData,
    setStepsData,
  };

  return (
    <MainContext.Provider value={contextValues}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
