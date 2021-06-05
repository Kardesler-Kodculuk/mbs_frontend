import React, { useContext } from "react";
import {
	Container,
	AppBar,
	Toolbar,
	makeStyles,
	CssBaseline,
	Typography,
	IconButton,
	Box,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { useRouteMatch } from "react-router-dom";
import { useAuth, useAlert, useUser } from "@mbs/services";
import { Sidebar, Content } from "./components";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		flexGrow: 1,
		zIndex: theme.zIndex.drawer + 1,
	},
	title: {
		flexGrow: 1,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		margin: theme.spacing(3),
	},
	logout: {
		marginRight: theme.spacing(2),
	},
}));

type props = {
	selections: string[];
	links: string[];
	contents: React.FC[];
};

export function User(props: props) {
	const classes = useStyles();
	const user = useUser();
	const auth = useAuth();
	const alert = useAlert();
	let { path, url } = useRouteMatch();

	const handleLogout = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault();
		await auth?.signOut();
	};
	if (!alert?.createAlert) {
		return <div />;
	}

	return (
		<Container>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit">
							<AccountCircleIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							MBS
						</Typography>
						<div className={classes.logout}>
							<IconButton color="inherit" onClick={handleLogout}>
								<ExitToAppOutlinedIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{user === null ? (
					<div></div>
				) : (
					<Sidebar selections={props.selections} to={url} links={props.links} />
				)}
				<main className={classes.content}>
					<Box display="flex" justifyContent="center" alignItems="center" style={{ minHeight: "60vh" }}>
						<Content contents={props.contents} to={path} links={props.links} />
					</Box>
				</main>
			</div>
			{alert?.PageAlert}
		</Container>
	);
}
