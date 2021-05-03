import React, { useContext } from "react";

import { useRouteMatch } from "react-router-dom";
import { UserContext } from "../hooks/UserContext";

import {
	Container,
	AppBar,
	Toolbar,
	makeStyles,
	CssBaseline,
	Typography,
	IconButton,
	Grid,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Sidebar from "./Sidebar";
import Content from "./Content";
import useLogout from "../hooks/useLogout";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

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

export default function User(props) {
	const { user } = useContext(UserContext);
	const { logoutUser } = useLogout(null);
	let { path, url } = useRouteMatch();
	const classes = useStyles();
	const { selections: Selections, links: Links, contents: Contents } = props;

	return (
		<Container>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							className={classes.menuButton}
							color="inherit"
							aria-label="open drawer">
							<AccountCircleIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							MBS
						</Typography>
						<div className={classes.logout}>
							<IconButton color="inherit" onClick={logoutUser}>
								<ExitToAppOutlinedIcon />
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{user === null ? (
					<div></div>
				) : (
					<Sidebar
						username={user.username}
						selections={Selections}
						to={url}
						links={Links}
						key_={"student_sidebar"}
						logoutHandler={logoutUser}
					/>
				)}
				<main className={classes.content}>
					<Grid container justify="center" alignItems="center" style={{ minHeight: "60vh" }}>
						<Content contents={Contents} to={path} links={Links} key_={"student_content"} />
					</Grid>
				</main>
			</div>
		</Container>
	);
}
