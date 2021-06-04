
export type User = {
    role: string;
    username: string;
    jury?: JuryData
    student?: StudentData
    advisor?: AdvisorData
} & UserInfo

type UserInfo = {
    [key: string]: StudentData | AdvisorData
}

type General = {
    user_id: number
    name_: string
    surname: string
    email: string
    phone_number: string
}

export type StudentData = {
    student_id: number
    is_approved: boolean
    is_thesis_sent: boolean
    has_proposed: boolean
    semester: number
    program_name: string
    department: string
    thesis_topic: string
    graduation_status: string
    latest_thesis_id: number
    jury_tss_decision: string
    is_advisors_recommended: boolean
    has_dissertation:boolean
} & General

export type AdvisorData = {
    department: string
    is_jury: boolean
} & General

export type JuryData = {
    department: string
    email: string
    institution: string
    is_appointed: number
    is_approved: number
    jury_id: number
    name_: string
    phone_number: string
    surname: string
    user_id: number
} & General

