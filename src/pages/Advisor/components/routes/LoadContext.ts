import { createContext, Dispatch, SetStateAction } from "react"

export const loadContext = createContext<{ load: boolean, setLoad: Dispatch<SetStateAction<boolean>> } | null>(null)