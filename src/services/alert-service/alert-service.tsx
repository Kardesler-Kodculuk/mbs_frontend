import React, { useContext, useState } from "react"
import { AlertContext } from "@mbs/contexts"
import { Alert as AlertT, Alerts, Color } from "@mbs/interfaces"
import Alert from "@material-ui/lab/Alert"
import { Snackbar } from "@material-ui/core"
import Fade from "@material-ui/core/Fade"

type props = {
	children: React.ReactNode
}

export const AlertProvider = (props: props) => {
	const [alerts, setAlerts] = useState<AlertT[]>([])

	const createAlert = (name: string, page: string, body: string, type: Color) => {
		if (alertIndex(name, page) < 0) {
			console.log("asdasdasdasdsa")
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

	const createAlerts = (newAlerts: [string, string, string, Color][]) => {
		setAlerts([])
		newAlerts.forEach((e) => createAlert(e[0], e[1], e[2], e[3]))
		setAlerts(() => {
			const reduced: AlertT[] = []
			newAlerts.forEach((e) =>
				reduced.push({
					name: e[0],
					page: e[1],
					body: e[2],
					type: e[3],
					open: false,
				})
			)
			return reduced
		})
	}
	const alertIndex = (name: string, page: string) => {
		const i = alerts.findIndex((e) => e.name === name && e.page === page)
		return i
	}

	const openAlert = (name: string, page: string) => {
		if (alerts.length > 0) {
			let newAlerts = [...alerts]
			let i = alertIndex(name, page)
			console.log(newAlerts)
			if (i >= 0) {
				console.log(i)
				newAlerts[i].open = true
				setAlerts([...newAlerts])
			}
		}
	}

	const closeAlert = (name: string, page: string) => {
		if (alerts.length > 0) {
			let newAlerts = [...alerts]
			let i = alertIndex(name, page)
			console.log(i)
			if (i >= 0) {
				newAlerts[i].open = false
				setAlerts([...newAlerts])
			}
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
		alerts,
		createAlert: createAlert,
		createAlerts,
		openAlert: openAlert,
		closeAlert: closeAlert,
		PageAlert: PageAlert,
	}

	return <AlertContext.Provider value={value}>{props.children}</AlertContext.Provider>
}

export const useAlert = () => {
	return useContext(AlertContext)
}
