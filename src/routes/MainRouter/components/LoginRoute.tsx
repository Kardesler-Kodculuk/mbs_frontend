import React, { useContext } from "react"
import { Route, Redirect } from 'react-router-dom';
import { useUser } from "@mbs/services"


type props = {
    component: React.FC
    path: string
}

export function LoginRoute(props: props) {
    const userContext = useUser()
    return userContext?.user ? <Route path={`${props.path}`} render={() => <props.component />}></Route> : <Redirect to='/login' />;
}