import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.css";

import { Title } from "../component/Title";
import { useState, useEffect } from "react";

import { ModelsForm } from "../component/ModelsForm";
import { GenerativeMols } from "../component/GenerativeMols";
import { Footer } from "antd/lib/layout/layout";

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
      <div className="container p-4 rounded" style={{backgroundColor: "#f8f9fa"}} >
        <h4 className="my-2">Choose Generative Model</h4>
        <ModelsForm className="my-2" label="Generative Model" models={['CGVAE', ' Generative Model 2']} setGenChem={setGenChem}></ModelsForm>
        <GenerativeMols className="my-2" genChem={genChem}></GenerativeMols>
      </div>
      <Footer style={{background:'white'}}></Footer>
    </div>
  );
};
