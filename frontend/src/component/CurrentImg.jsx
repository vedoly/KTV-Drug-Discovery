import React, { useState, useEffect } from "react";
import axios from "axios";
import { RetroSynthesis } from "../pages/retrosynthesis";
import { fetchRetrosynthesis } from "../api/api";
import { Modal, Button } from "antd";

export const CurrentImg = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const state = props.state;
  const setState = props.setState;
  let x = 0;
  const handleOk = () => {
    setIsModalVisible(false);
    setState({ ...state, pageState: "Loading" });
    fetchRetrosynthesis(state, setState);
  };

  const newChem = props.chem
    .replace("/", "v")
    .replace("\\", "w")
    .replace("#", "$");

  const handleClick = () => {
    setIsModalVisible(true);
    console.log("xxxxx");
    setState({ ...state, chem: props.chem });
    // fetchRetrosynthesis(state, setState);
  };

  if (props.chem === state.chem) {
    x = "border border-success border-5 ";
  } else {
    x = "";
  }
  return (
    <div className={x}>
      <div className={x}>
        {/* <p>{chem}</p> */}
        <img
          src={`http://localhost:5000/get-image/${newChem}.png`}
          width={150}
          height={150}
          className="shadow rounded"
          style={{ background: "transparent" }}
          onClick={handleClick}
        ></img>

        <Modal
          title={`${newChem}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={() => {
            setIsModalVisible(false);
          }}
          okText="Predict"
          cancelText="Cancel"
        >
          <img
            src={`http://localhost:5000/get-image/${newChem}.png`}
            width={"30%"}
            height={"30%"}
            className="shadow rounded"
            style={{ background: "transparent" }}
            onClick={() => {
              const queryString = new URLSearchParams(props.chem).toString();

              window.open(
                `https://pubchem.ncbi.nlm.nih.gov/#query=${queryString}`
              );
            }}
          ></img>
        </Modal>
      </div>
    </div>
  );
};
