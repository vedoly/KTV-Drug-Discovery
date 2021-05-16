import React, { useDebugValue, useState } from "react";
import { generateMolecules } from "../api/api";

export const ModelsForm = (props) => {

    const [modelName, setModelName] = useState('');
    const [num, setNum] = useState(0);
    
    const onSubmit = async (event) => {
        event.preventDefault(); // Prevent default submission
        try {
            props.setGenChem( await generateMolecules(modelName,num));
        } catch (e) {
          alert(`Registration failed! ${e.message}`);
        }
    }

    return (
        <div className={props.className}>
            <form className="form-inline" onSubmit={onSubmit}>
                <label className="fs-6 mr-2" for="inlineFormCustomSelectPref">{props.label}</label>
                <select className="custom-select my-1 mr-3" id="inlineFormCustomSelectPref"
                onChange = {(e) => setModelName(e.target.value)}>
                    <option selected value={""}>Choose...</option>
                    {props.models.map((model) =>  <option value={model}>{model}</option>)}
                </select>
                <div className="form-group">
                    <label className="fs-6 mr-2" for="chemicalName">Numbers of Molecules</label>
                    <input type="number" min="0" step="1" id="noMols" className="form-control mr-3" 
                    onChange = {(e) => setNum(e.target.value)}/>
                </div>
            
                <button type="submit" className="btn btn-primary my-1" disabled={!modelName || num <= 0}>Generate</button>
            </form>
        </div>
    )
};