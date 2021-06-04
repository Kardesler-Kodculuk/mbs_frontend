import { useEffect, useState } from "react"
import { User, Welcome } from "@mbs/components"
import { TopicForm } from "./components/TopicForm"
import { AdvisorProposal } from "./components/AdvisorProposal"
import { Theses } from "./components/Theses"
import { useAlert } from "@mbs/services"
export function Student() {
	const alert = useAlert()
	const [loaded, setLoaded] = useState(false)

	
	useEffect(() => {
		if (alert) {
			alert.createAlerts([
				["success", "topic_form", "Thesis Topic Has been submitted", "success"],
				["success", "advisor_proposal", "Proposal has been sent.", "success"],
				[
					"alert",
					"advisor_proposal",
					"Please enter your thesis topic before proposing to an advisor.",
					"warning",
				],
				["success", "thesis-upload", "Thesis has been uploaded.", "success"],
				[				"success",
				"thesis-download-student",
				"Thesis has been downloaded.",
				"success"],
				["success", "thesis-delete-student", "Thesis has been deleted.", "success"],
				["error", "thesis-upload", "Upload failed.", "error"],
			])
			setLoaded(true)
		}
	}, [])

	if (!loaded) {
		return null
	}

	const Selections: string[] = ["Home", "Select Topic", "Manage Thesis", "Select Advisor"]
	const Links: string[] = ["/home", "/thesis-topic", "/manage-thesis", "/select-advisor"]
	const Contents: React.FC[] = [Welcome, TopicForm, Theses, AdvisorProposal]

	return <User selections={Selections} links={Links} contents={Contents} />
}
