import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Route } from "react-router-dom";
import App from "./components/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
	<Route>
		<App />
	</Route>,

	document.getElementById("root")
);
