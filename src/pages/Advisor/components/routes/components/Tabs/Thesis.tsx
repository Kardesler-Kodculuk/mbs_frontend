import { TextField, Card, IconButton, makeStyles, Button, Box } from "@material-ui/core"
import { TheseData, CustomDialog } from "@mbs/components"
import { MBS } from "@mbs/utils"
import { useStudent, useAlert, useQuery } from "@mbs/services"
import { useForm } from "@mbs/hooks"
import axios from "axios"
import { useEffect } from "react"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"

import Alert from "@material-ui/lab/Alert"
const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 375,
		padding: 10,
	},
	title: {
		fontSize: 24,
		marginBottom: 12,
	},
	body: {
		fontSize: 18,
	},
	button: {
		color: "white",
		backgroundColor: "#ff9100",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#ffa733",
		},
	},
	download: {
		padding: 20,
	},
	input: {
		display: "flex",
		flexWrap: "wrap",
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(2),
		width: 220,
	},
}))

export function Thesis() {
	const classes = useStyles()
	const student = useStudent()
	const topicForm = useForm<string>({
		initials: {
			thesis_topic: "",
		},
	})
	const alert = useAlert()
	const query = useQuery()

	const data = [
		{
			name: "Copy Submission Status",
			status: student?.student?.is_thesis_sent ? "SENT" : "UNSENT",
		},
	]

	const handleTopic = async (e: React.SyntheticEvent): Promise<void> => {
		if (alert && query && student?.student) {
			e.preventDefault()
			if (topicForm.values["thesis_topic"] !== "") {
				await query
					.updateInfo("students", student?.student?.student_id, topicForm.values)
					.then((data) => {
						alert.openAlert("success", "advisor_change_topic")
					})
					.catch((err) => console.log(err))
				student?.refresh()
				topicForm.reset({
					thesis_topic: "",
				})
			} else {
				alert.openAlert("warning", "advisor_change_topic")
			}
		}
	}

	const handleSubmit = async (): Promise<void> => {
		if (alert && query && student?.student) {
			await query
				.updateInfo("students", student?.student?.student_id, {
					is_thesis_sent: true,
				})
				.then((data) => {
					alert.openAlert("success", "advisor_topic_submit")
				})
				.catch((err) => console.log(err))
			student?.refresh()
		}
	}
	
	useEffect(() => {
		student?.refresh()
	}, [])

	if (!student?.student) {
		return null
	}

	if (!student?.theses) {
		return (
			<Card className={classes.root}>
				<Box display="flex" justifyContent="center" alignItems="center">
					<TheseData />
				</Box>

				<Box
					fontWeight={150}
					marginBottom={3}
					marginTop={2}
					display="flex"
					justifyContent="center"
					alignItems="center">
					<CustomDialog
						disabled={student.student?.is_thesis_sent}
						title="Update Thesis Topic"
						variant="contained"
						component={Button}
						componentName="Update Topic"
						componentClassName={classes.button}
						submit={{ value: "Update", handler: handleTopic }}>
						<Box>
							<TextField value={student?.student.thesis_topic} className={classes.input} disabled />
						</Box>
						<Box>
							<TextField
								className={classes.input}
								value={topicForm.values["thesis_topic"]}
								onChange={(e) => {
									if (e.target.value.length < 180) {
										return topicForm.setValues("thesis_topic", e.target.value)
									}
								}}
							/>
						</Box>
					</CustomDialog>
				</Box>
				<Alert severity="info">Student did not uploaded a thesis</Alert>
			</Card>
		)
	}

	return (
		<Card className={classes.root}>
			<Box
				margin={2}
				padding={4}
				marginBottom={3}
				display="flex"
				justifyContent="center"
				alignItems="center">
				<TheseData data={data} />
				<a href={`${MBS?.url}/theses/${student.student.latest_thesis_id}`} download>
					<IconButton className={classes.download}>
						<CloudDownloadIcon fontSize="large" />
					</IconButton>
				</a>
			</Box>

			<Box
				fontWeight={150}
				marginBottom={3}
				display="flex"
				justifyContent="center"
				alignItems="center">
				<CustomDialog
					disabled={student.student?.is_thesis_sent}
					title="Update Thesis Topic"
					variant="contained"
					component={Button}
					componentName="Update Topic"
					componentClassName={classes.button}
					submit={{ value: "Update", handler: handleTopic }}>
					<Box>
						<TextField value={student?.student.thesis_topic} className={classes.input} disabled />
					</Box>
					<Box>
						<TextField
							className={classes.input}
							value={topicForm.values["thesis_topic"]}
							onChange={(e) => {
								if (e.target.value.length < 180) {
									return topicForm.setValues("thesis_topic", e.target.value)
								}
							}}
						/>
					</Box>
				</CustomDialog>

				{student.student?.is_thesis_sent && student?.theses?.plagiarism_ratio < 20 ? (
					<Button variant="contained" className={classes.button} disabled>
						Submit Copy
					</Button>
				) : (
					<Button variant="contained" className={classes.button} onClick={handleSubmit}>
						Submit Copy
					</Button>
				)}
			</Box>
		</Card>
	)
}
