import { StudentData, AdvisorData, ThesesData, DissertationData, JuryData } from "@mbs/interfaces"


export type StudentView = {
    student: StudentData | null
    advisor: AdvisorData | null
    theses: ThesesData | null
    dissertation: DissertationData | null
    jury: JuryData[] | null
    setStudent: React.Dispatch<React.SetStateAction<StudentData | null>>
    refresh: () => void
}