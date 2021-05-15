import React, { useDebugValue, useState } from "react";
import { generateMolecules } from "../api/api";

export const ModelsForm = (props) => {

    const [modelId, setModelId] = useState(-1);
    const [num, setNum] = useState(0);
    
    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
        try {
            props.setGenChem(generateMolecules(modelId,num));
        } catch (e) {
          alert(`Registration failed! ${e.message}`);
        }
    }

    return (
        <div className={props.className}>
            <form className="form-inline" onSubmit={onSubmit}>
                <label className="fs-6 mr-2" for="inlineFormCustomSelectPref">{props.label}</label>
                <select className="custom-select my-1 mr-3" id="inlineFormCustomSelectPref"
                onChange = {(e) => setModelId(e.target.value)}>
                    <option selected value={-1}>Choose...</option>
                    {props.models.map((model,index) =>  <option value={index}>{model}</option>)}
                </select>
                <div className="form-group">
                    <label className="fs-6 mr-2" for="chemicalName">Numbers of Molecules</label>
                    <input type="number" min="0" step="1" id="noMols" className="form-control mr-3" 
                    onChange = {(e) => setNum(e.target.value)}/>
                </div>
            
                <button type="submit" className="btn btn-primary my-1" disabled={modelId < 0 || num <= 0}>Generate</button>
            </form>
        </div>
    )
};