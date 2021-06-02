/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { StudentData, ThesesData, DissertationData, JuryData, AdvisorData } from "@mbs/interfaces"
import { createContext } from "react"
import { StudentView } from "@mbs/interfaces"
import { useQuery } from "@mbs/services"

export const StudentContext = createContext<StudentView | null>(null)

type props = {
	children: React.ReactNode
}

export const StudentProvider = (props: props) => {
	const [student, setStudent] = useState<StudentData | null>(null)
	const [advisor, setAdvisor] = useState<AdvisorData | null>(null)
	const [theses, setTheses] = useState<ThesesData | null>(null)
	const [dissertation, setDissertation] = useState<DissertationData | null>(null)
	const [jury, setJury] = useState<JuryData[] | null>(null)

	const query = useQuery()

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
		setDissertation(null)
		async function fetchAdvisor() {
			if (student?.latest_thesis_id) {
				await query
					?.queryInfo<AdvisorData>("students/advisor", [student?.student_id])
					.then((data) => {
						setAdvisor(data[0])
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
						setJury(data)
					})
					.then(() => {})
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
		theses,
		dissertation,
		jury,
		setStudent,
	}

	return <StudentContext.Provider value={value}>{props.children}</StudentContext.Provider>
}

export const useStudent = () => {
	return useContext(StudentContext)
}
