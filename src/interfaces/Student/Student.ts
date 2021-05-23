import { StudentData, ThesesData, DissertationData } from "@mbs/interfaces"

export type StudentView = {
    student: StudentData | null
    theses: ThesesData | null
    dissertation: DissertationData | null
    setStudent: React.Dispatch<React.SetStateAction<StudentData | null>>
}