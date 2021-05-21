import { Switch, Route } from "react-router-dom"
import { Landing, Login, Student, Advisor } from "@mbs/pages"

import { LoginRoute } from "./components/LoginRoute"


export function MainRouter() {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <LoginRoute component={Advisor} path="/:id/advisor" />
            <LoginRoute component={Student} path="/:id/student" />
        </Switch>
    );
}
