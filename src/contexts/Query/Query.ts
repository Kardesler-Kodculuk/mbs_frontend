import { createContext } from 'react'
import { Query } from "@mbs/interfaces"


export const QueryContext = createContext<Query | null>(null)
