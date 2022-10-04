import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import getConfig from "./near/config.js";
import { viewMethodOnContract } from "./near/utils.js";
import { data } from "./hardcoded-data";

async function initCrossword() {
  const nearConfig = getConfig(process.env.NEAR_ENV || "testnet");
  const solutionHash = await viewMethodOnContract(nearConfig, "get_solution");
  return { data, solutionHash };
}

initCrossword().then(({ data, solutionHash }) => {
  ReactDOM.render(
    <App data={data} solutionHash={solutionHash} />,
    document.getElementById("root")
  );
});
