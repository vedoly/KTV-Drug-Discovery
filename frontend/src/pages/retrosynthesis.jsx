import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

import { Title } from "../component/Title";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "../component/TextInput";
import { ImgList } from "../component/ImgList";
import { fetchRetrosynthesis } from "../api/api";
import { CurrentList } from "../component/CurrentList";
import { Row, Col, Button } from "antd";

export const RetroSynthesis = () => {
  const search =
    new URLSearchParams(useLocation().search).get("Chem") || "empty";
  const [state, setState] = useState({
    chem: search,
    currentChem: [search],
    resultChem: "Loading",
    logChem: [],
  });

  return (
    <div>
      <Title></Title>

      <Row>
        <Col span={15} offset={1}>
          <div
            className="shadow-lg p-3 mb-5 rounded"
            style={{ background: "#ebffff" }}
          >
            <CurrentList {...{ state, setState }}></CurrentList>
          </div>
        </Col>

        <Col
          span={6}
          offset={1}
          className="shadow-lg p-3 mb-5 bg-light rounded"
        >
          <div>
            <h4 className="pl-3">Log</h4>
            {state.logChem.map((chem) => (
              <li>{chem}</li>
            ))}
          </div>
        </Col>
      </Row>

      <Row className="">
        <Col
          span={10}
          className="shadow-lg rounded ml-4"
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

      <TextInput chem={state.chem}></TextInput>

      <div className="pl-3 pt-4">
        <ImgList className="pr-1" {...{ state, setState }}></ImgList>
      </div>
    </div>
  );
};
