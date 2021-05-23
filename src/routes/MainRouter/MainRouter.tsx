import { Switch, Route } from "react-router-dom"
import { Landing, Login, Student, Advisor, Jury, DBR } from "@mbs/pages"

import { LoginRoute } from "./components/LoginRoute"
import { DirectionsBusRounded } from "@material-ui/icons";


export function MainRouter() {
    return (
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/login" component={Login} />
            <LoginRoute component={Advisor} path="/:id/advisor" />
            <LoginRoute component={Student} path="/:id/student" />
            <LoginRoute component={Jury} path="/:id/jury" />
            <LoginRoute component={DBR} path="/:id/DBR" />
        </Switch>
    );
}
