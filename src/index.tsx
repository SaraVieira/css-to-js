import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import { Router } from "@reach/router";
import Home from "./pages/home";
import API from "./pages/api";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Router>
    <Home path="/" />
    <API path="/api" />
  </Router>,
  document.getElementById("root")
);

serviceWorker.register();
