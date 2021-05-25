import React, { useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import {
	Dialog,
	Button,
	DialogActions,
	DialogTitle,
	DialogContent,
	makeStyles,
} from "@material-ui/core";

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
	cancel: {
		color: "white",
		fontWeight: 70,
		backgroundColor: "#f44336",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#f6685e",
		},
	},
	submit: {
		color: "white",
		backgroundColor: "#4caf50 ",
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(2),
		"&:hover": {
			backgroundColor: "#6fbf73",
		},
	},
}));

type DialogData = {
	key: string;
	title: string;
	content: JSX.Element | null;
	submit: { value: string; handler: Function };
};

export function useDialog(props: DialogData) {
	const classes = useStyles();
	const [dialog, setDialog] = useState<DialogData | null>(props);
	const [contents, setContents] = useState<JSX.Element | null>(null);
	const [open, setOpen] = React.useState(false);

	const openDialog = () => {
		setOpen(true);
	};

	const closeDialog = () => {
		setOpen(false);
	};

	const dialogElement = (
		<Dialog open={open} onClose={closeDialog} keepMounted>
			<DialogTitle id="form-dialog-title">{dialog?.title}</DialogTitle>
			<DialogContent>{dialog?.content || contents}</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog} variant="contained" className={classes.cancel}>
					Cancel
				</Button>
				<Button
					variant="contained"
					className={classes.submit}
					onClick={() => {
						dialog?.submit.handler();
						closeDialog();
					}}>
					{dialog?.submit.value}
				</Button>
			</DialogActions>
		</Dialog>
	);

	return {
		dialog: dialogElement,
		setDialog,
		openDialog,
		closeDialog,
		setContents,
	};
}
