import { User, Welcome } from "@mbs/components"
import { useEffect, useState } from "react"
import { useAlert } from "@mbs/services"
import { ManageStudents } from "./components/ManageStudents"
export function Advisor() {
	const alert = useAlert()
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (alert) {
			alert.createAlerts([
				["success", "adv_student_proposal_approve", "Proposal accepted.", "success"],
				["success", "adv_student_proposal_reject", "Proposal rejected.", "success"],
				["error", "adv_student_proposal_error", "Proposal action encountered an error.", "error"],
				["success", "advisor_proposal", "Proposal has been sent.", "success"],
				[
					"alert",
					"advisor_proposal",
					"Please enter your thesis topic before proposing to an advisor.",
					"warning",
				],
				["warning", "advisor_jury_proposal", "Please add more members.", "warning"],
				["success", "advisor_jury_proposal", "Please add more members.", "success"],
				["error", "advisor_jury_proposal", "Please add more members.", "error"],
				["warning", "advisor_change_topic", "Invalid input.", "warning"],
				["success", "advisor_change_topic", "Topic changed.", "success"],
				["success", "advisor_topic_submit", "Thesis submitted changed.", "success"],
			])

			setLoaded(true)
		}
	}, [])

	if (!alert?.alerts) {
		return null
	}
	const Selections: string[] = ["Home", "Manage Student"]
	const Links: string[] = ["/home", "/manage-student"]
	const Contents: React.FC[] = [Welcome, ManageStudents]
	return <User selections={Selections} links={Links} contents={Contents} />
}
