import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/App.scss";
import { Provider } from "react-redux";
import { ReduxStore } from "./stores";
import theme from "./assets/theme.js";
import { MuiThemeProvider } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
