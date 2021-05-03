import React, { useContext } from "react";
import { Card, CardContent, Typography, makeStyles, Divider } from "@material-ui/core";
import { UserContext } from "../hooks/UserContext";

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	title: {
		fontSize: 24,
		marginBottom: 12,
	},
	body: {
		fontSize: 18,
	},
});

export default function Welcome() {
	const { user } = useContext(UserContext);
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h3" className={classes.title} color="primary">
					{`Welcome, ${user.username}`}
				</Typography>
				<Divider />
				<Typography className={classes.cody}>
					{" "}
					To start select an action from the navigation panel in the left hand side of the screen.
					<br />
					<br />
					Currently, you have {user.role} privileges.
				</Typography>
			</CardContent>
		</Card>
	);
}
