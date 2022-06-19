import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `pomodorox`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: ["gatsby-plugin-react-helmet", "gatsby-plugin-postcss"],
};

export default config;
