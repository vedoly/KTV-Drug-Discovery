import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Img = (props) => {
  const number = props.number;
  const state = props.state;
  const setState = props.setState;
  const result = props.result;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log(result);

    let newCurrentChem = state.currentChem;
    newCurrentChem = newCurrentChem.concat(result.split("."));

    let newLogChem = state.logChem;
    newLogChem.push(result + ">>" + state.chem);

    setState({
      ...state,
      logChem: newLogChem,
      chem: result,
      currentChem: newCurrentChem,
      pageState: "Choosing",
    });
  };

  // const handleCancel =

  const handleClick = () => {
    console.log(result);

    let newCurrentChem = state.currentChem;
    newCurrentChem = newCurrentChem.concat(result.split("."));

    let newLogChem = state.logChem;
    newLogChem.push(result + ">>" + state.chem);

    setState({
      ...state,
      logChem: newLogChem,
      chem: result,
      currentChem: newCurrentChem,
      pageState: "Choosing",
    });
  };

  return (
    <div>
      <div>{isModalVisible}</div>
      <img
        src={`http://localhost:5000/get-image/RX_${number}_reaction_tmp.png`}
        onClick={showModal}
        className="pl-4 pt-2 shadow p-3 pr-5"
      ></img>
      <Modal
        title={`RX_${number}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        <img
          src={`http://localhost:5000/get-image/RX_${number}_reaction_tmp.png`}
          className="pl-4 pt-2 shadow p-3 pr-5"
          width={"100%"}
          height={"40%"}
        ></img>
        <a
          href={`http://localhost:5000/get-image/heatmap_tmp${number - 1}.png`}
          target="popup"
        >
          <img
            src={`http://localhost:5000/get-image/heatmap_tmp${number - 1}.png`}
            width={"100%"}
            height={500}
          ></img>
        </a>
      </Modal>
    </div>
  );
};
