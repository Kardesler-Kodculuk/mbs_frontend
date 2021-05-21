
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

export interface Theses {
    theses: number[];
}

export interface Jury {
    jury: number[];
}

