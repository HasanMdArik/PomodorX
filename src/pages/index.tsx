import * as React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import App from "../App/App";
import Countdown from "../components/countdown";
import LoopInput from "../components/loopInput";
import TimeStepsMenu from "../components/timeStepsMenu/timeStepsMenu";
import MainContextProvider from "../contexts/mainContext";
import { componentBackgrounds, stateNames } from "../data/data";
import "../styles/global.css";

// markup
const IndexPage = () => {
  // 0 stands for timer not started
  // 1 stands for work time
  // 2 stands for short break
  // 3 stands for long break
  const [state, setState] = useState(0);

  return (
    <React.Fragment>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Proza+Libre:wght@500;600;800&display=swap"
          rel="stylesheet"
        />
        <title>PomodorX</title>
      </Helmet>

      <MainContextProvider>
        <App />
      </MainContextProvider>
    </React.Fragment>
  );
};

export default IndexPage;
