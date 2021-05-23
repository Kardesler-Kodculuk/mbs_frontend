/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { QueryContext, StudentContext } from "@mbs/contexts"
import { StudentData, ThesesData, DissertationData } from "@mbs/interfaces"
import { MBS } from "@mbs/utils"


type props = {
    children: React.ReactNode
}

export const StudentProvider = (props: props) => {
    const [student, setStudent] = useState<StudentData | null>(null)
    const [theses, setTheses] = useState<ThesesData | null>(null)
    const [dissertation, setDissertation] = useState<DissertationData | null>(null)

    const queryContext = useContext(QueryContext)
    useEffect(() => {
        async function fetchThese() {
            console.log(student)
            if (student?.latest_thesis_id && student?.latest_thesis_id > 0) {
                await queryContext?.queryInfo<ThesesData>("theses/metadata", [student?.latest_thesis_id])
                    .then(data => { setTheses(data[0]); console.log(data) })
                    .catch((err) => { })
            }
        }
        fetchThese()
    }, [student])

    useEffect(() => {
        async function fetchDissertation() {
            if (student?.latest_thesis_id) {
                await queryContext?.queryInfo<DissertationData>("dissertation", [student?.student_id])
                    .then(data => { setDissertation(data[0]); console.log(data) })
                    .catch((err) => { })
            }
        }
        fetchDissertation()
    }, [student])

    const value = {
        student,
        theses,
        dissertation,
        setStudent
    }

    return (
        <StudentContext.Provider value={value}>
            {props.children}
        </StudentContext.Provider>
    )
}

export const useStudent = () => {
    return useContext(StudentContext)
}
