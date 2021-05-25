
export interface Proposal {
    proposal_id: number;
    student_id: number;
    advisor_id: number;
}

export interface Recommendation {
    recommendation_id: number;
    student_id: number;
    advisor_id: number;
}

export interface Students {
    students: number[];
    defenders: number[];
}

export interface Advisors {
    advisors: number[];
}

export interface ThesesData {
    thesis_id: number;
    plagiarism_ratio: number;
    thesis_topic: string;
    due_date: number;
    submission_date: number;
}

export interface Jury {
    jury_members: number[];
}

export interface DissertationData {
    student_id: number;
    jury_ids: number[];
    jury_date: number;
    status: string;
}

