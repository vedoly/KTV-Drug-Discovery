import { CurrentImg } from "./CurrentImg";
import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

export const CurrentList = ({ state, setState }) => {
  return state.chem != "empty " ? (
    <div>
      <h4 className="pl-4">Chem</h4>

      <Row className="pl-3">
        {state.currentChem.map((chem) => (
          <ui>
            <CurrentImg
              state={state}
              setState={setState}
              chem={chem}
            ></CurrentImg>
          </ui>
        ))}
      </Row>
    </div>
  ) : (
    <div></div>
  );
};
