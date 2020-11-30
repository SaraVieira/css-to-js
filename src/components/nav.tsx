import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import FeedbackIcon from '@material-ui/icons/Feedback';
// import { Link } from "@reach/router";
import "./nav.css";
import { FeedbackFish } from "@feedback-fish/react";

export const Nav = () => (
  <nav>
    {/* <Link to="/api">API</Link> */}
    <FeedbackFish projectId="55c642d43711fc">
      <button>
        <FeedbackIcon style={{ fontSize: 26 }} />
      </button>
    </FeedbackFish>
    <a href="https://github.com/SaraVieira/css-to-js/">
      <GitHubIcon titleAccess="Our GitHub repo" style={{ fontSize: 26 }} />
    </a>
  </nav>
);
