import React from "react";
import { useAuth, useUser } from "@mbs/services";
import { Redirect } from "react-router-dom";
import { Container, Grid, TextField, makeStyles, Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useForm } from "@mbs/hooks";

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

export function Login() {
	const user = useUser();
	const auth = useAuth();
	const classes = useStyles();

	const form = useForm<string>({
		initials: {
			username: "",
			password: "",
		},
	});

	if (user?.isLoading) {
		return <div />;
	}
	if (user?.user?.username) {
		return (
			<Redirect to={`/${user?.user[user?.user?.role].user_id}/${user?.user?.role}/home`}></Redirect>
		);
	}

	const handleLogin = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault();
		await auth?.signIn(form.values["username"], form.values["password"]);
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
						onChange={(e) => form.setValues("username", e.target.value)}
						color="primary"
						error={auth?.error}
					/>
					<TextField
						className={classes.textField}
						required
						label="password"
						type="password"
						onChange={(e) => form.setValues("password", e.target.value)}
						color="primary"
						error={auth?.error}
					/>

					<Button variant="contained" color="primary" type="submit">
						login
					</Button>
				</Grid>
			</form>
		</Container>
	);
}
