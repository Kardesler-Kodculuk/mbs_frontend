import React, { useContext, useState, createContext } from "react"
import { Alert as AlertT, Alerts, Color } from "@mbs/interfaces"
import { Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import Fade from "@material-ui/core/Fade"

export const AlertContext = createContext<Alerts | null>(null)

type props = {
	children: React.ReactNode
}

export const AlertProvider = (props: props) => {
	const [alerts, setAlerts] = useState<AlertT[]>([])

	const createAlert = (name: string, page: string, body: string, type: Color) => {
		if (alertIndex(name, page) < 0) {
			let newAlerts = [
				...alerts,
				{
					name: name,
					page: page,
					body: body,
					type: type,
					open: false,
				},
			]
			setAlerts([...newAlerts])
		}
	}
	const alertIndex = (name: string, page: string) => {
		const i = alerts.findIndex((e) => e.name === name && e.page === page)
		return i
	}

	const openAlert = (name: string, page: string) => {
		if (alerts.length > 0) {
			let newAlerts = [...alerts]
			newAlerts[alertIndex(name, page)].open = true
			setAlerts([...newAlerts])
		}
	}

	const closeAlert = (name: string, page: string) => {
		if (alerts.length > 0) {
			let newAlerts = [...alerts]
			newAlerts[alertIndex(name, page)].open = false
			setAlerts([...newAlerts])
		}
	}

	const PageAlert = (
		<div>
			{alerts.map((alert: AlertT) => (
				<Snackbar
					open={alert.open}
					onClose={(e) => {
						closeAlert(alert.name, alert.page)
					}}
					TransitionComponent={Fade}
					autoHideDuration={6000}
					key={alert.name + "_" + alert.page}>
					<Alert severity={alert.type}>{alert.body}</Alert>
				</Snackbar>
			))}
		</div>
	)

	const value = {
		createAlert: createAlert,
		openAlert: openAlert,
		closeAlert: closeAlert,
		PageAlert: PageAlert,
	}

	return <AlertContext.Provider value={value}>{props.children}</AlertContext.Provider>
}

export const useAlert = () => {
	return useContext(AlertContext)
}
