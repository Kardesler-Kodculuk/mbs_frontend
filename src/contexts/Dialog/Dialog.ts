import { createContext } from 'react'
import { Dialog } from "@mbs/interfaces"
export const DialogContext = createContext<Dialog | null>(null)
