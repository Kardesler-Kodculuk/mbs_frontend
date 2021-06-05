import { Typography, Card, CardContent, makeStyles, Button, Box } from "@material-ui/core"
import { useStudent, useQuery } from "@mbs/services"
import { TheseData } from "../ThesesData"
import Alert from "@material-ui/lab/Alert"
import { useEffect, useState } from "react"
const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 375,
	},
	title: {
		fontSize: 24,
		marginBottom: 12,
	},
	body: {
		fontSize: 18,
	},
	reject: {
		color: "white",
		fontWeight: 70,
		backgroundColor: "#f44336",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#f6685e",
		},
	},
	accept: {
		color: "white",
		backgroundColor: "#4caf50 ",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#6fbf73",
		},
	},
	correction: {
		color: "white",
		backgroundColor: "#ff9100",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#ffa733",
		},
	},
}))

export function Evaluation() {
	const classes = useStyles()
	const student = useStudent()
	const query = useQuery()
	const [value, setValue] = useState<string>("")
	const [load, setLoad] = useState<boolean>(false)

	useEffect(() => {
		async function fetchDecision() {
			let res = await query
				?.queryID<{
					evaluation: string
				}>("evaluation/" + student?.student?.student_id)
				.catch(() => setValue(""))
			if (res !== undefined) {
				setValue(res.evaluation)
			}
			console.log(res)
		}
		fetchDecision()
	}, [load])

	if (student?.dissertation?.status === "Pending") {
		return <Alert severity="info">Student proposed Jury and Date</Alert>
	}

	const handleEvaluation = async (e: string) => {
		await query?.postActionWithBody("evaluation/" + student?.student?.student_id, {
			thesis_id: student?.theses?.thesis_id,
			evaluation: e,
		})
		student?.refresh()
		setLoad(load)
	}

	return (
		<Card className={classes.root}>
			<Box>
				<CardContent>
					<TheseData />
				</CardContent>
			</Box>
			<Box
				fontWeight={150}
				marginBottom={3}
				display="flex"
				justifyContent="center"
				alignItems="center">
				{student?.dissertation?.status === "Undecided" && value === "" ? (
					<div>
						<Button
							variant="contained"
							className={classes.accept}
							onClick={() => handleEvaluation("Approved")}>
							Accept
						</Button>
						<Button
							variant="contained"
							className={classes.correction}
							onClick={() => handleEvaluation("Correction")}>
							Correction
						</Button>
						<Button
							variant="contained"
							className={classes.reject}
							onClick={() => handleEvaluation("Rejected")}>
							Reject
						</Button>
					</div>
				) : null}
				<Box>
					<Box display="flex" justifyContent="center" alignItems="center" margin={1}>
						{value ? <Alert severity="info">You evaluated the thesis as {value}!</Alert> : null}
					</Box>
					<Box display="flex" justifyContent="center" alignItems="center" margin={1}>
						{student?.dissertation?.status === "Approved" ? (
							<Alert severity="info">Student thesis given Approval</Alert>
						) : null}
						{student?.dissertation?.status === "Corrected" ? (
							<Alert severity="info">Student thesis given Correction</Alert>
						) : null}
						{student?.dissertation?.status === "Rejected" ? (
							<Alert severity="info">Student thesis given Rejection</Alert>
						) : null}
					</Box>
				</Box>
			</Box>
		</Card>
	)
}
