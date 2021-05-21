import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from "axios"
import { AuthContext } from "@mbs/contexts"
import { MBS } from "@mbs/utils"

type props = {
    signIn?: (email: string, password: string) => Promise<void>
    signOut?: () => Promise<void>
    children: React.ReactNode
}

export const AuthProvider = (props: props) => {
    const [error, setError] = useState<boolean>(false);
    let history = useHistory();

    let SignIn = async (username: string, password: string) => {
        await axios.post(MBS?.url + "jwt", { username, password },
            { withCredentials: true })
            .then(() => history.go(0))
            .catch((err) => { console.log(err); setError(true) })
    }

    let SignOut = async () => {
        return await axios.delete(MBS?.url + "jwt",
            { withCredentials: true })
            .then(() => history.go(0))
            .catch(() => { })
    }


    const value = {
        signIn: props.signIn || SignIn,
        signOut: props.signOut || SignOut,
        error
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}