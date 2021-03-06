import React, { useState, useEffect } from "react";
import axios from "axios";

export const fetchRetrosynthesis = (state, setState) => {
  setState({ ...state, resultChem: "Loading", pageState: "Loading" });
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
      console.log(response.data.on_chem);

      setState({
        ...state,
        currentChem: currentChemx,
        resultChem: response.data.result,
        pageState: "Suggestion",
        onChem: response.data.on_chem,
      });

      console.log(state.resultChem);
    })

    .catch((error) => {
      console.log(error);
    });
};

export const generateMolecules = async (modelId, num) => {
  try {
    let res = await axios.post("http://127.0.0.1:5555/generative/generate", {
      modelId: modelId,
      num: num,
    });
    if (res.status == 200) return res.data.result;
    else console.log(res);
  } catch (e) {
    console.log(e);
  }
};

export const fetchPathWay = (state, setState) => {
  setState({ ...state, logState: "Loading" });

  axios
    .post("http://127.0.0.1:5000/getPathWay", {
      log: state.logChem,
    })
    .then((response) => {
      console.log("velody");
      setState({ ...state, logState: "Ready" });
    })

    .catch((error) => {
      setState({ ...state, logState: "Ready" });
      console.log(error);
    });
};

export const processImage = (chems, state, setState) => {
  setState({ ...state, pageState: "Loading" });
  axios
    .post("http://127.0.0.1:5000/processImage", {
      chems: chems,
    })
    .then((response) => {
      console.log("velody");
      // setState({ ...state, pageState: prev });
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

export const getSimilar = (chem, state, setState) => {
  setState({ ...state, pageState: "Loading" });
  axios
    .post("http://127.0.0.1:5000/getSimilar", {
      smi: chem,
    })
    .then((response) => {
      console.log(response.data.similar);
      processImage(response.data.similar, state, setState);
      setTimeout(() => {
        setState({
          ...state,
          similar: response.data.similar,
          pageState: "Ready",
        });
      }, 2000);
    })

    .catch((error) => {
      console.log(error);
      setState({
        ...state,

        genPageState: "Error",
      });
    });
};
