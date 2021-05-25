import { useEffect, useState } from "react";
import { TheseData } from "@mbs/components";
import { JuryData } from "@mbs/interfaces";
import { useQuery, useStudent } from "@mbs/services";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { Typography, Card, IconButton, makeStyles, Button, Box } from "@material-ui/core";
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
}));

export function Jury() {
	const query = useQuery();
	const classes = useStyles();
	const student = useStudent();


	if (!student?.theses || !student?.jury) {
		return null;
	}

	const data = [
		{
			name: "Proposed Jury Members",
			status: student?.jury?.map((member) => `${member.name_} ${member.surname}`).join(", "),
		},
	];

	return (
		<Card className={classes.root}>
			<Box>
				<TheseData data={data} />
			</Box>
			<Box
				fontWeight={150}
				marginBottom={3}
				display="flex"
				justifyContent="center"
				alignItems="center">
				<Button variant="contained" className={classes.approve}>
					{" "}
					Approve
				</Button>
				<Button variant="contained" className={classes.reject}>
					Reject
				</Button>
			</Box>
		</Card>
	);
}
