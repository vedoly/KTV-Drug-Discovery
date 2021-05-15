import React, { useDebugValue, useState } from "react";

export const GenerativeMols = (props) => {

    return (
        <div className={"d-flex flex-wrap bd-highlight example-parent " + props.className }>
            {props.genChem.map((chem,idx) => <div className="p-2 bd-highlight col-example" key={idx}>{chem}</div> )}
        </div>
    )
};