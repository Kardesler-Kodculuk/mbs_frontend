import { useContext } from "react"
import { Redirect } from "react-router-dom"
import { useUser } from "@mbs/services"

export function Landing() {
	const userContext = useUser()

	if (userContext?.isLoading) {
		return <div />
	}

	return userContext?.user ? (
		<Redirect
			to={`/${userContext?.user[userContext?.user?.role].user_id}/${
				userContext?.user?.role
			}/home`}></Redirect>
	) : (
		<Redirect to="/login" />
	)
}
