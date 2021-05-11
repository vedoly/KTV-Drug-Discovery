import React, { useState, useEffect } from "react";
import axios from "axios";
import { RetroSynthesis } from "../pages/retrosynthesis";
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Img = (props) => {
  const number = props.number;
  const state = props.state;
  const setState = props.setState;
  const result = props.result;
  const handleClick = () => {
    console.log(result);

    let newCurrentChem = state.currentChem;
    newCurrentChem = newCurrentChem.concat(result.split("."));
    // newCurrentChem = newCurrentChem.filter((value, index, arr) => {
    //   return value != chem;
    // });

    let newLogChem = state.logChem;
    newLogChem.push(result);
    setState({
      ...state,
      logChem: newLogChem,
      chem: result,
      currentChem: newCurrentChem,
    });
    // logChem.push(result.split("."));
    // setLogChem(logChem);
  };

  return (
    <div>
      {/* {`RX_${number}:    \n`} */}
      {/* {result} */}
      <img
        src={`http://localhost:5000/get-image/RX_${number}_reaction_tmp.png`}
        onClick={handleClick}
        className="pl-4 pt-2 shadow p-3 pr-5"
      ></img>
      {/* <img
        src={`http://localhost:5000/get-image/heatmap_tmp${number - 1}.png`}
        onClick={handleClick}
        width={350}
        height={350}
      ></img> */}
    </div>
  );
};
