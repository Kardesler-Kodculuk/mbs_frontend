import { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";

export default function useAlert(initials) {
	const [state, setState] = useState(() => {
		const reduced = [];
		return initials.reduce((map, alert) => {
			return [
				...map,
				{
					name: alert["name"],
					body: alert.body,
					type: alert.type,
					key: alert.name + alert.page_,
					open: false,
				},
			];
		}, reduced);
	});

	const alertIndex = (alert) => {
		const i = state.findIndex((e) => e.name === alert);
		return i;
	};

	const handleOpen = (alert) => {
		let newState = [...state];
		newState[alertIndex(alert)].open = true;
		setState([...newState]);
	};

	const handleClose = (alert) => {
		let newState = [...state];
		newState[alertIndex(alert)].open = false;
		setState([...newState]);
	};

	function Alerts() {
		return (
			<div>
				{state.map((alert) => (
					<Snackbar
						open={alert.open}
						onClose={(e) => {
							handleClose(alert.name);
						}}
						TransitionComponent={Fade}
						autoHideDuration={6000}
						key={alert.key}>
						<Alert severity={alert.type}>{alert.body}</Alert>
					</Snackbar>
				))}
			</div>
		);
	}

	return {
		Alerts,
		handleOpen,
	};
}
