import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

import { Title } from "../component/Title";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "../component/TextInput";
import { ImgList } from "../component/ImgList";
import { fetchPathWay, fetchRetrosynthesis } from "../api/api";
import { CurrentList } from "../component/CurrentList";
import { Row, Col, Button } from "antd";
import { LogChem } from "../component/LogChem";
function delay(URL) {
  setTimeout(function () {
    window.location = URL;
  }, 500);
}

export const RetroSynthesis = () => {
  const search =
    new URLSearchParams(useLocation().search).get("Chem") || "empty";
  const [state, setState] = useState({
    chem: search,
    currentChem: [search],
    resultChem: "Loading",
    logChem: [],
    pageState: "Choosing",
    logState: "Ready",
    onChem: [],
  });

  return (
    <div>
      <Title></Title>
      {/* <div>
        {state.pageState}
        {state.logState}
        {state.onChem}
      </div> */}
      
      <div
        className="container p-4 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        {/* <div className="d-flex justify-content-end"><LogChem {...{ state, setState }}></LogChem></div> */}
        
        <div className="container p-3 rounded" style={{ background: "white" }}>
        <div style={{float:"right"}}><LogChem {...{ state, setState }}></LogChem></div>
          <CurrentList {...{ state, setState }}></CurrentList>
        </div>

        {/* <TextInput {...{ state, setState }}></TextInput> */}

        <div className="pt-4">
          <ImgList className="pr-1" {...{ state, setState }}></ImgList>
        </div>
      </div>
    </div>
  );
};
