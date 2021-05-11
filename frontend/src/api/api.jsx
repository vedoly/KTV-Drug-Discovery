import React, { useState, useEffect } from "react";
import axios from "axios";
export const fetchRetrosynthesis = (state, setState) => {
  setState({ ...state, resultChem: "Loading" });
  console.log(state.resultChem);
  axios
    .post("http://127.0.0.1:5000/retrosynthesis/predict", {
      smi: state.chem,
    })
    .then((response) => {
      console.log(response.data);

      let currentChemx = state.currentChem.filter((value, index, array) => {
        return value != state.chem;
      });
      console.log(currentChemx);

      setState({
        ...state,
        currentChem: currentChemx,
        resultChem: response.data.result,
      });

      console.log(state.resultChem);
    })

    .catch((error) => {
      console.log(error);
    });
};
