/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react"
import { useStudent, useQuery, useAlert } from "@mbs/services"
import { Students, StudentData, Proposal } from "@mbs/interfaces"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"
import { TableRow, TableCell, IconButton, Button } from "@material-ui/core"
import { Link, useRouteMatch } from "react-router-dom"
import { loadContext } from "../LoadContext"
import CheckIcon from "@material-ui/icons/Check"
import ClearIcon from "@material-ui/icons/Clear"
export function ManagedStudents() {
	const afterLoad = useContext(loadContext)
	const [loadStudent, setLoadStudent] = useState<boolean>(true)
	const [loadProposal, setLoadProposal] = useState<boolean>(true)
	const [proposals, setProposals] = useState<Proposal[] | null>(null)
	const [managed, setManaged] = useState<Students | null>(null)
	const [students, setStudents] = useState<StudentData[] | null>(null)
	const [studentsManaged, setStudentsManaged] = useState<StudentData[] | null>(null)
	const [defenders, setDefenders] = useState<StudentData[] | null>(null)
	const [defendingStudents, setDefendingStudents] = useState<StudentData[] | null>(null)
	const query = useQuery()
	let alert = useAlert()
	const selectedStudent = useStudent()
	let path = useRouteMatch()

	useEffect(() => {
		async function fetchProposals() {
			await query
				?.queryID<Proposal[]>("proposals")
				.then((data) => {
					console.log(data)
					setProposals(data)
				})
				.catch((err) => {})
		}

		fetchProposals()
	}, [loadProposal])

	useEffect(() => {
		async function fetchStudents() {
			await query
				?.queryID<Students>("students")
				.then((data) => {
					setManaged(data)
				})
				.catch((err) => {})
		}
		fetchStudents()
	}, [loadStudent])

	useEffect(() => {
		async function fetchStudents() {
			if (managed) {
				await query
					?.queryInfo<StudentData>(
						"students",
						managed.students.filter((student) => managed.defenders?.includes(student))
					)
					.then((data) => {
						setDefendingStudents(data)
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response)
					})
				await query
					?.queryInfo<StudentData>(
						"students",
						managed.students.filter((student) => !managed.defenders?.includes(student))
					)
					.then((data) => {
						setStudentsManaged(data)
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response)
					})
				await query
					?.queryInfo<StudentData>(
						"students",
						managed.defenders.filter((student) => !managed.students?.includes(student))
					)
					.then((data) => {
						setDefenders(data)
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response)
					})
			} else {
				setDefendingStudents(null)
				setDefenders(null)
				setStudentsManaged(null)
			}
		}
		fetchStudents()
	}, [managed])

	
	useEffect(() => {
		async function fetchStudents() {
			if (proposals) {
				await query
					?.queryInfo<StudentData>(
						"students",
						proposals?.map((r) => r.student_id)
					)
					.then((data) => {
						console.log(data)
						setStudents(data)
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response)
					})
			}
		}
		fetchStudents()
	}, [proposals])

	const handleApprove = async (student: StudentData) => {
		let id = proposals?.find((e) => e.student_id === student.student_id)
		query
			?.putID("proposals/" + id?.proposal_id)
			.then((e) => {
				alert?.openAlert("success", "adv_student_proposal_approve")
				setLoadProposal(!loadProposal)
				setLoadStudent(!loadStudent)
			})
			.catch((e) => alert?.openAlert("error", "adv_student_proposal_error"))
	}

	const handleReject = async (student: StudentData) => {
		let id = proposals?.find((e) => e.student_id === student.student_id)
		query
			?.deleteID("proposals/" + id?.proposal_id)
			.then((e) => {
				alert?.openAlert("success", "adv_student_proposal_reject")
				setLoadProposal(!loadProposal)
				setLoadStudent(!loadStudent)
			})
			.catch((e) => alert?.openAlert("error", "adv_student_proposal_error"))
	}

	const handleSelection = (student: StudentData) => {
		selectedStudent?.setStudent(student)
	}

	return (
		<>
			{defendingStudents?.map((student) => (
				<TableRow key={"table_row_" + student.name_ + "_" + student.user_id}>
					<TableCell component="th" scope="row">
						{student.name_ + " " + student.surname}
					</TableCell>
					<TableCell align="right">
						<IconButton
							component={Link}
							to={path.url + "/" + student.user_id}
							onClick={() => handleSelection(student)}>
							<OpenInNewIcon color="primary" />
						</IconButton>
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to={path.url + "/evaluate/" + student.user_id}
							onClick={() => handleSelection(student)}>
							{"Evaluate"}
						</Button>
					</TableCell>
				</TableRow>
			))}
			{defenders?.map((student) => (
				<TableRow key={"table_row_" + student.name_ + "_" + student.user_id}>
					<TableCell component="th" scope="row">
						{student.name_ + " " + student.surname}
					</TableCell>
					<TableCell align="right">
						<Button
							variant="contained"
							color="primary"
							component={Link}
							to={path.url + "/evaluate/" + student.user_id}
							onClick={() => handleSelection(student)}>
							{"Evaluate"}
						</Button>
					</TableCell>
				</TableRow>
			))}
			{studentsManaged?.map((student) => (
				<TableRow key={"table_row_" + student.name_ + "_" + student.user_id}>
					<TableCell component="th" scope="row">
						{student.name_ + " " + student.surname}
					</TableCell>
					<TableCell align="right">
						<IconButton
							component={Link}
							to={path.url + "/" + student.user_id}
							onClick={() => handleSelection(student)}>
							<OpenInNewIcon color="primary" />
						</IconButton>
					</TableCell>
				</TableRow>
			))}
			{students?.map((student) => (
				<TableRow key={"table_row_" + student.name_ + "_" + student.user_id}>
					<TableCell>
						<IconButton onClick={() => handleApprove(student)}>
							<CheckIcon color="primary" />
						</IconButton>
						<IconButton onClick={() => handleReject(student)}>
							<ClearIcon color="primary" />
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row" align="right">
						{student.name_ + " " + student.surname}
					</TableCell>
				</TableRow>
			))}
		</>
	)
}
