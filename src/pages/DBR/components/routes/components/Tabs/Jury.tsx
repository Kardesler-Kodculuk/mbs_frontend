import { useState } from "react"
import { TheseData } from "@mbs/components"
import { useQuery, useStudent } from "@mbs/services"
import { Card, Menu, MenuItem, makeStyles, Button, Box, Link } from "@material-ui/core"
import { MBS } from "@mbs/utils"
import Alert from "@material-ui/lab/Alert"
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
		marginTop: 5,
		color: "white",
		fontWeight: 70,
		backgroundColor: "#f44336",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#f6685e",
		},
	},
	approve: {
		marginTop: 5,
		color: "white",
		backgroundColor: "#4caf50 ",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#6fbf73",
		},
	},
}))

export function Jury() {
	const query = useQuery()
	const classes = useStyles()
	const student = useStudent()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	
	if (!student?.student?.has_dissertation) {
		return <Alert severity="info">Student does not have a proposal</Alert>
	}

	if (!student?.theses || !student?.jury) {
		return null
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const data = [
		{
			name: "Proposed Jury Members",
			status: student?.jury?.map((member) => `${member.name_} ${member.surname}`).join(", "),
		},
	]

	const handleApprove = () => {
		if (student?.student?.student_id) {
			query?.putID("dissertation/" + student?.student?.student_id)
			student.refresh()
		}
	}

	const handleReject = () => {
		if (student?.student?.student_id) {
			query?.deleteID("dissertation/" + student?.student?.student_id)
			student.refresh()
		}
	}

	return (
		<Card className={classes.root}>
			<Box margin={1} display="flex">
				<Box flexGrow={1}></Box>
				<Box justifyContent="flex-end">
					<Button variant="contained" onClick={handleClick}>
						Form
					</Button>
					<Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
						<Link
							href={`${MBS?.url}/forms/${student.student.student_id}/TD`}
							download
							color="inherit">
							<MenuItem>TD</MenuItem>
						</Link>
						<Link
							href={`${MBS?.url}/forms/${student.student.student_id}/TJ`}
							download
							color="inherit">
							<MenuItem>TJ</MenuItem>
						</Link>
						<Link
							href={`${MBS?.url}/forms/${student.student.student_id}/TJ-a`}
							download
							color="inherit">
							<MenuItem>TJ-a</MenuItem>
						</Link>
						<Link
							href={`${MBS?.url}/forms/${student.student.student_id}/TS`}
							download
							color="inherit">
							<MenuItem>TS</MenuItem>
						</Link>
					</Menu>
				</Box>
			</Box>
			<Box>
				<TheseData data={data} />
			</Box>
			{!(student?.dissertation && !(student?.dissertation?.status === "Pending")) ? (
				<Box
					fontWeight={150}
					marginBottom={3}
					display="flex"
					justifyContent="center"
					alignItems="center">
					<Button variant="contained" className={classes.approve} onClick={handleApprove}>
						{" "}
						Approve
					</Button>
					<Button variant="contained" className={classes.reject} onClick={handleReject}>
						Reject
					</Button>
				</Box>
			) : (
				<Alert severity="success">Student dissertation is approved</Alert>
			)}
		</Card>
	)
}
