import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `pomodorx`,
    siteUrl: `https://pomodorx.netlify.app`,
  },
  plugins: ["gatsby-plugin-react-helmet", "gatsby-plugin-postcss"],
};

export default config;
