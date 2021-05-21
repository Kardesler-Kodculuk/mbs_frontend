
export type User = {
    role: string;
    username: string;
    jury?: Jury
    student?: Student
    advisor?: Advisor
} & UserInfo

type UserInfo = {
    [key: string]: Student | Advisor
}

type General = {
    user_id: number
    student_id: number
    name_: string
    surname: string
    email: string
    phone_number: string
}

type Student = {
    is_approved: boolean
    has_proposed: boolean
    semester: number
    program_name: string
    department: string
    thesis_topic: string
    graduation_status: string
    jury_tss_decision: string
    latest_thesis_id: number
} & General

type Advisor = {
    department: string
    is_jury: boolean
} & General

type Jury = {
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

