import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Route } from "react-router-dom";
import App from "./components/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Route>
      <App />
    </Route>
  </React.StrictMode>,
  document.getElementById("root")
);
