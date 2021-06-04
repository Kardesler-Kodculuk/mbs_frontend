import { Typography, Card, IconButton, makeStyles, Button, Box } from "@material-ui/core"
import { TheseData } from "@mbs/components"
import { useStudent } from "@mbs/services"
import CloudDownloadIcon from "@material-ui/icons/CloudDownload"
import { MBS } from "@mbs/utils"
import Alert from "@material-ui/lab/Alert"
const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 480,
	},
	title: {
		fontSize: 24,
		marginBottom: 12,
	},
	body: {
		fontSize: 18,
	},
	download: {
		padding: 20,
	},
	send_thesis: {
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
	send_results: {
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

export function Thesis() {
	const classes = useStyles()
	const student = useStudent()
	const data = [
		{
			name: "Copy Submission Status",
			status: student?.student?.is_thesis_sent ? "SENT" : "UNSENT",
		},
	]

	if (!student?.theses) {
		return <Alert severity="info">Student did not uploaded a thesis</Alert>
	}
	if (!student?.student) {
		return null
	}

	return (
		<Card className={classes.root}>
			<Box padding={4} marginBottom={3} display="flex" justifyContent="center" alignItems="center">
				<TheseData data={data} />
				{student?.student?.is_thesis_sent ? (
					<a href={`${MBS?.url}/theses/${student.student.latest_thesis_id}`} download>
						<IconButton className={classes.download}>
							<CloudDownloadIcon fontSize="large" />
						</IconButton>
					</a>
				) : null}
			</Box>
			<Box
				fontWeight={150}
				marginBottom={3}
				display="flex"
				justifyContent="center"
				alignItems="center">
				<Button variant="contained" className={classes.send_results} disabled>
					{" "}
					Send Thesis Copy to GSES
				</Button>
				<Button variant="contained" className={classes.send_thesis} disabled>
					Send Results to the GSES
				</Button>
			</Box>
		</Card>
	)
}
