import React, { useDebugValue, useState } from "react";

export const GenerativeMols = (props) => {

    return (
        <div className={"d-flex flex-wrap bd-highlight example-parent justify-content-center " + props.className }>
            {props.genChem.map((item,idx) => 
                // <div className="p-2 bd-highlight col-example" key={idx}>{item[0]}</div>
                <figure className="m-3">
                    <img src={`http://localhost:5555/get-image/gen_`+item[0].replace("#","$")+`.png`}></img>
                    <figcaption className='my-2' style={{textAlign:"center"}}>QED: {item[1]}</figcaption>
                </figure>
             )}
        </div>
    )
};