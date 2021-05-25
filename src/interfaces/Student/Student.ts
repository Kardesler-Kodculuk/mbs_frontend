import { StudentData, ThesesData, DissertationData, JuryData } from "@mbs/interfaces"

export type StudentView = {
    student: StudentData | null
    theses: ThesesData | null
    dissertation: DissertationData | null
    jury: JuryData[] | null
    setStudent: React.Dispatch<React.SetStateAction<StudentData | null>>
}