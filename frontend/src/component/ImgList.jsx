import React, { useState, useEffect } from "react";
import axios from "axios";
import { Img } from "./Img";
import { RetroSynthesis } from "../pages/retrosynthesis";
import { Spin, Alert } from "antd";

export const ImgList = (props) => {
  const resultChem = props.state.resultChem;
  const numbers = props.state.onChem.map((x) => +x);
  numbers.sort((a, b) => a - b);
  if (props.state.pageState !== "Loading") {
    // return props.state.pageState === "Suggestion" ? (
    return numbers.map((number) => (
        <ui>
          {/* {`RX_${number}:    \n`} */}

          <Img
            number={number}
            result={resultChem[number - 1]}
            state={props.state}
            setState={props.setState}
          ></Img>
        </ui>
      ));
    // ) : (
    //   <div>Select Smi</div>
    // );
  } else {
    return (
      <div>
        <Spin tip="Loading..." size="large">
          <Alert message="" description="" type="" />
        </Spin>
      </div>
    );
  }
};
