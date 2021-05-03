import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Route } from "react-router-dom";
import App from "./components/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Route basename={process.env.PUBLIC_URL}>
      <App />
    </Route>
  </React.StrictMode>,
  document.getElementById("root")
);
