import { createContext } from 'react'
import { Auth } from "@mbs/interfaces"


export const AuthContext = createContext<Auth | null>(null)
