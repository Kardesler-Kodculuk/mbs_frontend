import { createContext } from 'react'
import { UserData } from "@mbs/interfaces"


export const UserContext = createContext<UserData | null>(null)
