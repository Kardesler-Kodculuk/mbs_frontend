import React, { useContext, useEffect, useState, useCallback } from 'react'
import axios from "axios"
import { UserContext } from "@mbs/contexts"
import { User } from "@mbs/interfaces"
import { MBS } from "@mbs/utils"


type props = {
    children: React.ReactNode
}

export const UserProvider = (props: props) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setLoading] = useState<boolean>(true);

    const findUser = useCallback(async () => {
        return await axios.get(MBS?.url + "users", { withCredentials: true })
            .then((res) => { setUser(res.data); setLoading(false); console.log(res.data) })
            .catch(() => { setLoading(false) })
    }, [])

    useEffect(() => {
        findUser()
    }, [findUser])

    const value = {
        user: user || null,
        getUser: findUser,
        isLoading
    }

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    return useContext(UserContext)
}
