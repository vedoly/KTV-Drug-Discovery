import React, { useState } from "react";
import './Component.css';

export const Title = () => {
  return (
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
          <div style={{ textAlign:'center'}}>
              <h1 class="display-4">KnotTeemoV</h1>
              {/* <hr class="my-4" style={{backgroundColor:"whitesmoke"}} /> */}
              <p class="lead">Cutting edge technology for Drug Discovery
              </p>
          </div>
      </div>
  </div>
  );
};
