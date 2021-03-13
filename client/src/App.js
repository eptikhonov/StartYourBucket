import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./assets/css/App.scss";
import MainLayout from "../src/layouts/Main.js";
import UserLayout from "../src/layouts/User.js";
import TeamLayout from "../src/layouts/Team.js";
import BucketLayout from "../src/layouts/Bucket.js";
import LandingLayout from "../src/layouts/Landing.js";
import GenericNotFound from "../src/views/GenericNotFound.js";
const App = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/b"} render={(props) => <BucketLayout {...props} />} />
        <Route path="/page-not-found" component={GenericNotFound} />
        <Redirect exact from={"/home"} to={"/"} />
        {isAuthenticated ? (
          <>
            <Route path={"/u"} render={(props) => <UserLayout {...props} />} />
            <Route path={"/t"} render={(props) => <TeamLayout {...props} />} />
            <Route path={"/"} render={(props) => <MainLayout {...props} />} />
          </>
        ) : (
          <>
            <Route path={"/"} render={(props) => <LandingLayout {...props} />} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
