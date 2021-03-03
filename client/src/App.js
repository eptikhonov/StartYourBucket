import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./assets/css/App.scss";

import MainLayout from "../src/layouts/Main.js";
import LandingLayout from "../src/layouts/Landing.js";
const App = (props) => {
  var isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Switch>
        <Route path={isAuthenticated ? "/home" : "/"} render={(props) => (isAuthenticated ? <MainLayout {...props} /> : <LandingLayout {...props} />)} />
        {isAuthenticated ? <Redirect exact from="/" to="/home" /> : null}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
