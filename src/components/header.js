import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
// import { Link } from "@reach/router";
import "./header.css";

export const Header = () => (
  <nav>
    {/* <Link to="/api">API</Link> */}
    <a href="https://github.com/SaraVieira/css-to-js/">
      <GitHubIcon titleAccess="Our GitHub repo" style={{ fontSize: 26 }} />
    </a>
  </nav>
);
