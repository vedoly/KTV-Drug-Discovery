import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

import { Title } from "../component/Title";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextInput } from "../component/TextInput";
import { ImgList } from "../component/ImgList";
import { CurrentImg } from "../component/CurrentImg";

import { CurrentList } from "../component/CurrentList";
import { Row, Col, Button } from "antd";
import { ModelsForm } from "../component/ModelsForm";
import { GenerativeMols } from "../component/GenerativeMols";

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
  const [pageState, setPageState] = useState("init");
  const [genChem, setGenChem] = useState([]);

  return (
    <div>
      <Title></Title>
      <h1>test</h1>
      <div className="container p-4 rounded" style={{backgroundColor: "#f8f9fa"}} >
        <h4 className="my-2">Choose Generative Model</h4>
        <ModelsForm className="my-2" label="Generative Model" models={['CGVAE', ' Generative Model 2']} setGenChem={setGenChem}></ModelsForm>
        <GenerativeMols className="my-2" genChem={genChem}></GenerativeMols>
      </div>
    </div>
  );
};
