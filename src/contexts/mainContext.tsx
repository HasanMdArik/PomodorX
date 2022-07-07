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
  return <>{children}</>;
};

export default MainContextProvider;
