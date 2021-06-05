import { useRouteMatch } from "react-router-dom";
import { ComponentTabs } from "@mbs/components";
import { useStudent } from "@mbs/services";
import { Thesis } from "./components/Tabs/Thesis";
import { Jury } from "./components/Tabs/Jury";
import { Recommend } from "./components/Tabs/Recommend";

export function ManagePage() {
	const student = useStudent();
	const path = useRouteMatch();

	const pages = [
		{ name: "Thesis Evaluation", content: Thesis },
		{ name: "Jury Evaluation", content: Jury },
		{ name: "Recommend Advisors", content: Recommend },
	];

	if (!student?.student) {
		return null;
	}
	return (
		<ComponentTabs
			pages={pages}
			current={student?.student?.name_ + " " + student?.student?.surname}
			goBack={{ name: "Students", link: path.url }}
		/>
	);
}
