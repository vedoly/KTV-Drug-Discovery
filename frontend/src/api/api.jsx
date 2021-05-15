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
        pageStage: "Suggestion",
      });

      console.log(state.resultChem);
    })

    .catch((error) => {
      console.log(error);
    });
};

export const generateMolecules = (modelId) => {
  if (modelId == 0) {
    return [0,1,2,3,4,5,6,7,8,9];
  }
  return [9,8,7,6,5,4,3,2,1,0];
  
};

export const fetchPathWay = (state, setState) => {
  axios
    .post("http://127.0.0.1:5000/getPathWay", {
      log: state.logChem,
    })
    .then((response) => {
      console.log("velody");
    })

    .catch((error) => {
      console.log(error);
    });
};

export const processImage = (chems, state, setState) => {
  setState({ ...state, pageState: "Loading" });
  axios
    .post("http://127.0.0.1:5 000/processImage", {
      chems: chems,
    })
    .then((response) => {
      console.log("velody");
      setState({ ...state, pageState: "Suggestion" });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getGen = (state, setState) => {
  setState({ ...state, genChem: "Loading", pageState: "Loading" });

  axios
    .post("http://127.0.0.1:5555/generative/generate", {
      path: "CGVAE",
    })
    .then((response) => {
      console.log(response.data);
      processImage(Object.keys(response.data.result), state, setState);
      setState({
        ...state,
        genChem: response.data.result,
      });
    })

    .catch((error) => {
      console.log(error);
    });
};
