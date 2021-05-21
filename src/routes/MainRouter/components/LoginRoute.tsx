import React, { useContext } from "react"
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from "@mbs/contexts"


type props = {
    component: React.FC
    path: string
}

export function LoginRoute(props: props) {
    const userContext = useContext(UserContext)
    return userContext?.user ? <Route path={`${props.path}`} render={() => <props.component />}></Route> : <Redirect to='/login' />;
}