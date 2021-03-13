import * as React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";

import routes from "../routes/routes.js";
import { Header, Footer } from "../components";
function BucketLayout() {
  const location = useLocation();
  const getRoutes = (routes) => {
    var routeComponents = routes.map((prop, key) => {
      if (prop.layout === "/b") {
        return <Route exact path={prop.layout + prop.path} render={(props) => <prop.component {...props} />} key={key} />;
      } else {
        return null;
      }
    });
    routeComponents.push(<Redirect key={404} to={"/page-not-found"} />);
    return routeComponents;
  };

  React.useEffect(() => {
    // update component or styling upon location change
  }, [location]);

  return (
    <>
      <div>
        <Header />
        <Switch>{getRoutes(routes)}</Switch>
        <Footer />
      </div>
    </>
  );
}

export default BucketLayout;
