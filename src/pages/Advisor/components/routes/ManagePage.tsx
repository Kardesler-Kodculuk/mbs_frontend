import { createContext, useState } from "react"
import { useRouteMatch } from "react-router-dom"
import { ComponentTabs } from "@mbs/components"
import { useStudent } from "@mbs/services"
import { Thesis } from "./components/Tabs/Thesis"
import { JuryProposal } from "./components/Tabs/JuryProposal"
import { loadContext } from "./LoadContext"

export function ManagePage() {
	const [load, setLoad] = useState<boolean>(true)
	const student = useStudent()
	const path = useRouteMatch()
	const pages = [
		{ name: "Thesis", content: Thesis },
		{ name: "Jury", content: JuryProposal },
	]

	if (!student?.student) {
		return null
	}
	return (
		<loadContext.Provider value={{ load, setLoad }}>
			<ComponentTabs
				pages={pages}
				current={student?.student?.name_ + " " + student?.student?.surname}
				goBack={{ name: "Students", link: path.url }}
			/>
		</loadContext.Provider>
	)
}
