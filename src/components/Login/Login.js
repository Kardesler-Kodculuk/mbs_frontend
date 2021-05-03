import React, { useContext } from "react";
import useAuth from "../hooks/useAuth";
import useForm from "../hooks/useForm";
import { UserContext } from "../hooks/UserContext";
import { Redirect } from "react-router-dom";

import { Container, Grid, TextField, makeStyles, Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		margin: theme.spacing(1),
		width: "25ch",
	},
	title: {
		fontSize: 25,
		marginBottom: 75,
	},
	Icon: {
		width: 60,
		height: 60,
	},
}));

export default function Login({ setToken }) {
	const { user, isLoading } = useContext(UserContext);
	const classes = useStyles();
	const { values, handleChange } = useForm({
		initialValues: {
			username: "",
			password: "",
		},
	});
	const { error, loginUser } = useAuth();

	if (isLoading) {
		return <div />;
	}

	if (user) {
		return <Redirect to={`/${user.id}/${user.role}/home`} />;
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		await loginUser(values);
	};

	return (
		<Container>
			<form onSubmit={handleLogin}>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
					style={{ minHeight: "70vh" }}>
					<Typography className={classes.title}>MBS</Typography>
					<AccountCircleIcon className={classes.Icon} />
					<TextField
						className={classes.textField}
						required
						label="email"
						onChange={(e) => handleChange("username", e)}
						color="primary"
						error={error}
					/>
					<TextField
						className={classes.textField}
						required
						label="password"
						type="password"
						onChange={(e) => handleChange("password", e)}
						color="primary"
						error={error}
					/>

					<Button variant="contained" color="primary" type="submit">
						login
					</Button>
				</Grid>
			</form>
		</Container>
	);
}
