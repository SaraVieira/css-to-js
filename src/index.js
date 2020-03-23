// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import Home from "./home";
import API from "./api";
import "./index.css";
import { Router } from "@reach/router";

ReactDOM.render(
  <Router>
    <Home path="/" />
    <API path="/api" />
  </Router>,
  document.getElementById("root")
);
