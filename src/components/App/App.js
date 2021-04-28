import React from "react";

import { Switch, Route } from "react-router-dom";

import { UserContext } from "../hooks/UserContext";

import Login from "../Login/Login";
import Advisor from "../Advisor/Advisor";
import Student from "../Student/Student";
import useUser from "../hooks/useUser";
import RouteLogin from "../Login/RouteLogin";
import Landing from "../Landing/Landing";

export default function App() {
  const { user, setUser, isLoading } = useUser();

  return (
    <div className="wrapper">
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <RouteLogin path="/:uuid/student" component={Student} />
          <RouteLogin path="/:uuid/advisor" component={Advisor} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
}
