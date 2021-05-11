import React, { useState, useEffect } from "react";
import axios from "axios";
import { RetroSynthesis } from "../pages/retrosynthesis";

export const CurrentImg = (props) => {
  const state = props.state;
  const setState = props.setState;
  let x = 0;
  const newChem = props.chem
    .replace("/", "v")
    .replace("\\", "w")
    .replace("#", "$");

  const handleClick = () => {
    console.log("xxxxx");
    setState({ ...state, chem: props.chem });
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
      </div>
    </div>
  );
};
