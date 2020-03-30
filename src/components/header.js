import React from "react";
import { GHIcon } from "./icons";
// import { Link } from "@reach/router";
import "./header.css";

export const Header = () => (
  <nav>
    {/* <Link to="/api">API</Link> */}
    <a href="https://github.com/SaraVieira/css-to-js/">
      <GHIcon width={26} height={26} />
    </a>
  </nav>
);
