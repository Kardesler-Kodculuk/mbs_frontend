import { createContext } from 'react'
import { Alerts } from "@mbs/interfaces"
export const AlertContext = createContext<Alerts | null>(null)
