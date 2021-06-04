import React, { useEffect, useState } from "react";
import { useQuery, useAlert, useUser } from "@mbs/services";
import { useForm } from "@mbs/hooks";
import {
	Card,
	CardContent,
	Typography,
	makeStyles,
	Divider,
	Container,
	TextField,
	Grid,
	Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		margin: theme.spacing(1),
		width: "40ch",
	},
	title: {
		fontSize: 25,
	},
	body: {
		fontSize: 18,
	},
}));

export function TopicForm() {
	const query = useQuery();
	const user = useUser();
	const alert = useAlert();
	const classes = useStyles();
	const [load, setLoad] = useState(true);
	const form = useForm<string>({
		initials: {
			thesis_topic: "",
		},
	});

	const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
		if (alert && query && user?.user?.student) {
			e.preventDefault();
			await query
				.updateInfo("students", user?.user?.student?.student_id, form.values)
				.then(() => alert.openAlert("success", "topic_form"))
				.catch((err) => console.log(err));
			await user.getUser();
			setLoad(!load);
		}
	};
	if (!user) {
		return null;
	}

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h3" className={classes.title} color="primary" noWrap>
					Submit Thesis Topic
				</Typography>
				<Divider />
				<Container>
					<form onSubmit={handleSubmit}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="center"
							style={{ minHeight: "20vh", minWidth: "35vh" }}>
							<TextField
								className={classes.textField}
								required
								label={user?.user?.student?.thesis_topic}
								color="primary"
								onChange={(e) => form.setValues("thesis_topic", e.target.value)}
							/>
							<Button variant="contained" color="primary" type="submit">
								Submit
							</Button>
						</Grid>
					</form>
				</Container>
			</CardContent>
		</Card>
	);
}
