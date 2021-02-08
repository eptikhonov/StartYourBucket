import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./assets/css/App.scss";

import MainLayout from "../src/layouts/Main.js";
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" render={(props) => <MainLayout {...props} />} />
        <Redirect exact from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
