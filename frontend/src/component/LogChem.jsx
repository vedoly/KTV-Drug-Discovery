import React, { useState, useEffect } from "react";
import axios from "axios";
import { RetroSynthesis } from "../pages/retrosynthesis";
import { fetchRetrosynthesis, fetchPathWay } from "../api/api";
import { Modal, Button } from "antd";

export const LogChem = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const state = props.state;
  const setState = props.setState;
  let x = 0;
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleClick = () => {
    setIsModalVisible(true);
    fetchPathWay(state, setState);
  };

  return (
    <div>
      <h1 onClick={handleClick}>Log</h1>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        okText="OK"
        cancelText="Cancel"
      >
        {state.logState != "Loading" ? (
          <img
            src={`http://localhost:5000/get-image/velody.png`}
            width={"100%"}
            height={"100%"}
            className="shadow rounded"
            style={{ background: "transparent" }}
          ></img>
        ) : (
          "Loading"
        )}
      </Modal>
    </div>
  );
};
