import React from "react";

import { Link } from "react-router-dom";
import {
	List,
	Drawer,
	ListItem,
	Divider,
	Toolbar,
	makeStyles,
	Typography,
	ListItemText,
} from "@material-ui/core";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: "auto",
	},
	item: {
		flexGrow: 1,
		flexShrink: 1,
	},
	listItemText: {
		fontSize: "0.7em", //Insert your required size
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function Sidebar(props) {
	const classes = useStyles();

	const { selections: Selections, to: To, links: Links } = props;
	const sidebar = Selections.map((content, i) => (
		<div key={"sidebar_selection_" + i}>
			<ListItem className={classes.item} button component={Link} to={To + Links[i]}>
				<ListItemText
					className={classes.listItemText}
					primary={
						<Typography variant="h6" component="h2">
							{content}
						</Typography>
					}></ListItemText>
			</ListItem>
			<Divider />
		</div>
	));

	return (
		<div className={classes.root}>
			<Drawer
				className={classes.drawer}
				classes={{
					paper: classes.drawerPaper,
				}}
				variant="persistent"
				anchor="left"
				open={true}>
				<Toolbar />
				<div className={classes.drawerContainer}>
					<Divider />
					<List dense className={classes.list}>
						{sidebar}
					</List>
				</div>
			</Drawer>
		</div>
	);
}
