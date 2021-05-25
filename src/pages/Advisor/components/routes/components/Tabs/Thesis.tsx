import { Typography, Card, IconButton, makeStyles, Button, Box } from "@material-ui/core";
import { TheseData } from "@mbs/components";
import { useStudent } from "@mbs/services";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
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
}));

export function Thesis() {
	const classes = useStyles();
	const student = useStudent();
	const data = [
		{
			name: "Copy Submission Status",
			status: student?.student?.is_thesis_sent ? "SENT" : "UNSENT",
		},
	];
	if (!student?.theses) {
		return null;
	}
	return (
		<Card className={classes.root}>
			<Box padding={4} marginBottom={3} display="flex" justifyContent="center" alignItems="center">
				<TheseData data={data} />
				<IconButton className={classes.download}>
					<CloudDownloadIcon fontSize="large" />
				</IconButton>
			</Box>
			<Box
				fontWeight={150}
				marginBottom={3}
				display="flex"
				justifyContent="center"
				alignItems="center">
				<Button variant="contained" className={classes.button}>
					{" "}
					Update Topic
				</Button>
				<Button variant="contained" className={classes.button}>
					Submit Copy
				</Button>
			</Box>
		</Card>
	);
}
