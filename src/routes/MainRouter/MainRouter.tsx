import { Switch, Route } from "react-router-dom"
import { Landing, Login, Student, Advisor, Jury, DBR } from "@mbs/pages"
import { useAlert, useAuth, useQuery, useStudent, useUser } from "@mbs/services"
import { LoginRoute } from "./components/LoginRoute"
import { DirectionsBusRounded } from "@material-ui/icons"

export function MainRouter() {
	const alert = useAlert()
	const auth = useAuth()
	const query = useQuery()
	const student = useStudent()
	const user = useUser()

	if (!alert || !auth || !query || !student || !user) {
		return null
	}
    
	return (
		<Switch>
			<Route exact path="/" component={Landing} />
			<Route path="/login" component={Login} />
			<LoginRoute component={Advisor} path="/:id/advisor" />
			<LoginRoute component={Student} path="/:id/student" />
			<LoginRoute component={Jury} path="/:id/jury" />
			<LoginRoute component={DBR} path="/:id/DBR" />
		</Switch>
	)
}
