import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

import { Title } from "../component/Title";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "../component/TextInput";
import { ImgList } from "../component/ImgList";
import { CurrentImg } from "../component/CurrentImg";
import {
  fetchPathWay,
  fetchRetrosynthesis,
  processImage,
  getGen,
} from "../api/api";

import { CurrentList } from "../component/CurrentList";
import { Row, Col, Button } from "antd";

const RenderItem = (props) => {
  return (
    <ul>
      {props.items.map((item, i) => (
        <li key={i}>item.name</li>
      ))}
    </ul>
  );
};

export const Generative = () => {
  const [state, setState] = useState({ pageState: "init", genChem: "" });

  return (
    <div
      onClick={() => {
        getGen(state, setState);
      }}
    >
      <h1>test</h1>

      {Object.keys(state.genChem).map((chem) => (
        <ui>
          <CurrentImg
            state={state}
            setState={setState}
            chem={chem}
          ></CurrentImg>
        </ui>
      ))}
    </div>
  );
};
