import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import Home from "./pages/home";
import API from "./pages/api";
import { Router } from "@reach/router";

ReactDOM.render(
  <Router>
    <Home path="/" />
    <API path="/api" />
  </Router>,
  document.getElementById("root")
);
