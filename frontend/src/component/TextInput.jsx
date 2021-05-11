import React, { useState } from "react";

export const TextInput = (props) => {
  if (props.chem === "empty") {
    return (
      <div className="pt-3">
        <form>
          <label>
            Name:
            <input type="text" name="Chem" />
          </label>
          <button
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
