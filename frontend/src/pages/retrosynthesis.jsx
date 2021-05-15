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
    pageStage: "Init",
  });

  return (
    <div>
      <Title></Title>
      <div>{state.pageStage}</div>
      <div
        className="container p-4 rounded"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <Row className="">
          <div
            className="container p-3 rounded"
            style={{ background: "white" }}
          >
            <h4>Something</h4>
            <CurrentList {...{ state, setState }}></CurrentList>
          </div>
        </Row>
        <LogChem {...{ state, setState }}></LogChem>
        <Row className="mt-3">
          <Col
            span={10}
            className="shadow-lg rounded"
            style={{ background: "#DCDBFF", padding: "8px 0" }}
          >
            <h5 className="pt-3 pl-3">Chem : {state.chem}</h5>
          </Col>
          <Col span={6} className="pt-3" offset={6}>
            {" "}
            <Button
              type="primary"
              className="pt-1"
              onClick={(e) => {
                fetchRetrosynthesis(state, setState);
              }}
            >
              Predict
            </Button>
          </Col>
        </Row>

        <TextInput {...{ state, setState }}></TextInput>

        <div className="pt-4">
          <ImgList className="pr-1" {...{ state, setState }}></ImgList>
        </div>
      </div>
    </div>
  );
};
