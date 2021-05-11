import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { RetroSynthesis } from "./pages/retrosynthesis";
import { Test } from "./pages/test";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/retrosynthesis" exact component={RetroSynthesis} />
        <Route path="/test" exact component={Test} />
      </Switch>
    </BrowserRouter>
  );
};
