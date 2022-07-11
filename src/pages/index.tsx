import * as React from "react";
import { Helmet } from "react-helmet";
import App from "../App/App";
import MainContextProvider from "../contexts/mainContext";
import "../styles/global.css";

const IndexPage = () => {
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
