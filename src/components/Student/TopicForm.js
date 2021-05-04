import React, { useContext, useState } from "react";
import useForm from "../hooks/useForm";
import { UserContext } from "../hooks/UserContext";
import axios from "axios";
import useAlert from "../hooks/useAlert";

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

export default function TopicForm() {
	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState(null);
	const classes = useStyles();
	const { user } = useContext(UserContext);

	//Thesis Topic Form
	const { values, handleChange } = useForm({
		initialValues: {
			thesis_topic: "",
		},
	});

	//Alert For Thesis Topic
	const { Alerts, handleOpen } = useAlert([
		{
			name: "success",
			type: "success",
			page_: "TopicForm",
			body: "Thesis Topic has been submitted.",
		},
	]);
	//Thesis Topic submit request to the MBS
	const thesisTopicSubmit = async (data) => {
		const url = "https://mbsbackend.herokuapp.com/";
		const { thesis_topic } = data;
		return axios
			.patch(
				url + "students/" + user.student.user_id,
				{
					thesis_topic,
				},
				{ withCredentials: true }
			)
			.then(async (e) => {
				handleOpen("success");
			})
			.catch((err) => {
				setError(true);
			});
	};

	//Prevents from page to reset by preventing default
	const handleSubmit = async (e) => {
		e.preventDefault();
		await thesisTopicSubmit(values);
	};

	return (
		<div>
			<Card className={classes.root}>
				<CardContent>
					<Typography variant="h3" className={classes.title} color="primary">
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
									label="Thesis Topic"
									color="primary"
									onChange={(e) => handleChange("thesis_topic", e)}
								/>

								<Button variant="contained" color="primary" type="submit">
									Submit
								</Button>
							</Grid>
						</form>
					</Container>
				</CardContent>
			</Card>
			<Alerts />
		</div>
	);
}
