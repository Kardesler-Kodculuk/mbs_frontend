import { createContext } from 'react'
import { StudentView } from "@mbs/interfaces"

export const StudentContext = createContext<StudentView | null>(null)
