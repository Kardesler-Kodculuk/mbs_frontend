import React, { useState } from "react";

import { Switch, Route } from "react-router-dom";

import { UserContext } from "../hooks/UserContext";
import { AlertContext } from "../hooks/AlertContext";
import useAlert from "../hooks/useAlert";

import Login from "../Login/Login";
import Advisor from "../Advisor/Advisor";
import Student from "../Student/Student";
import useUser from "../hooks/useUser";
import RouteLogin from "../Login/RouteLogin";
import Landing from "../Landing/Landing";

export default function App() {
	//User state
	const { state, Alerts, setAlerts, handleOpen } = useAlert();
	const { user, setUser, isLoading, setLoading } = useUser();
	//Router for the pages
	//All of the user routes will be here
	return (
		<div className="wrapper">
			<AlertContext.Provider value={{ AlertState: state, Alerts, setAlerts, handleOpen }}>
				<UserContext.Provider value={{ user, setUser, isLoading, setLoading }}>
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route path="/login" component={Login} />
						<RouteLogin path="/:id/student" component={Student} />
						<RouteLogin path="/:id/advisor" component={Advisor} />
					</Switch>
				</UserContext.Provider>
			</AlertContext.Provider>
		</div>
	);
}
