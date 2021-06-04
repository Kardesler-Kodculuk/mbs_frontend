/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { QueryContext, StudentContext } from "@mbs/contexts"
import { StudentData, ThesesData, DissertationData, JuryData, AdvisorData } from "@mbs/interfaces"
import { MBS } from "@mbs/utils"

type props = {
	children: React.ReactNode
}

export const StudentProvider = (props: props) => {
	const [student, setStudent] = useState<StudentData | null>(null)
	const [advisor, setAdvisor] = useState<AdvisorData | null>(null)
	const [theses, setTheses] = useState<ThesesData | null>(null)
	const [dissertation, setDissertation] = useState<DissertationData | null>(null)
	const [jury, setJury] = useState<JuryData[] | null>(null)

	const query = useContext(QueryContext)

	const refresh = async () => {
		if (student) {
			await query
				?.queryInfo<StudentData>("students", [student?.user_id])
				.then((data) => {
					setStudent(data[0])
				})
				.then(() => {})
		}
	}

	useEffect(() => {
		setTheses(null)
		async function fetchThese() {
			if (student?.latest_thesis_id && student?.latest_thesis_id > 0) {
				await query
					?.queryInfo<ThesesData>("theses/metadata", [student?.latest_thesis_id])
					.then((data) => {
						setTheses(data[0])
					})
					.catch((err) => {})
			}
		}
		fetchThese()
	}, [student])

	useEffect(() => {
		setAdvisor(null)
		async function fetchAdvisor() {
			if (student?.latest_thesis_id) {
				await query
					?.queryInfo<{ advisor: AdvisorData }>("students/advisor", [student?.student_id])
					.then((data) => {
						setAdvisor(data[0].advisor)
					})
					.catch((err) => {})
			}
		}
		fetchAdvisor()
	}, [student])

	useEffect(() => {
		setDissertation(null)
		async function fetchDissertation() {
			if (student?.latest_thesis_id) {
				await query
					?.queryInfo<DissertationData>("dissertation", [student?.student_id])
					.then((data) => {
						setDissertation(data[0])
					})
					.catch((err) => {})
			}
		}
		fetchDissertation()
	}, [student])

	useEffect(() => {
		async function fetchJury() {
			if (dissertation?.jury_ids) {
				await query
					?.queryInfo<JuryData>("jury", dissertation?.jury_ids)
					.then((data) => {
						console.log(data)
						setJury(data)
					})
					.catch((err) => {
						console.log(err.response)
					})
			}
		}
		fetchJury()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dissertation])

	const value = {
		student,
		advisor,
		theses,
		dissertation,
		jury,
		setStudent,
		refresh,
	}

	return <StudentContext.Provider value={value}>{props.children}</StudentContext.Provider>
}

export const useStudent = () => {
	return useContext(StudentContext)
}
