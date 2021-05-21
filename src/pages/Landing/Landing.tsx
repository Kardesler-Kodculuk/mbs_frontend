import { useContext } from "react"
import { Redirect } from "react-router-dom"
import { UserContext } from "@mbs/contexts"

export function Landing() {
  const userContext = useContext(UserContext)

  if (userContext?.isLoading) {
    return <div />
  }

  return userContext?.user ? <Redirect to={`/${userContext?.user[userContext?.user?.role].user_id}/${userContext?.user?.role}/home`} ></Redirect> : <Redirect to='/login' />;
}

