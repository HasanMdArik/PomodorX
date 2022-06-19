import * as React from "react";
import { Helmet } from "react-helmet";
import "../styles/global.css";

// markup
const IndexPage = () => {
  return (
    <main>
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
      </Helmet>
    </main>
  );
};

export default IndexPage;
