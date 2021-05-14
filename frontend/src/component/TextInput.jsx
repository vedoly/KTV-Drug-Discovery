import React, { useState } from "react";

export const TextInput = (props) => {
  if (props.chem === "empty") {
    return (
      
    <div>
      <form className="form-inline">
        <div className="form-group">
          <label for="chemicalName">Name:</label>
          <input type="text" id="chemicalName" name="Chem" className="form-control mx-3" />
        </div>
        <button type="submit" className="btn btn-primary"
          onClick={(e) => {
            console.log(e);
          }}
          >
          Submit
        </button>
      </form>
    </div>
    );
  } else {
    return <div></div>;
  }
};


