import { NestedPage } from "@mbs/components";
import { useRouteMatch } from "react-router-dom";
import { StudentPage, ManagePage } from "./routes";

export function ManageStudents() {
	let { path } = useRouteMatch();

	let pages = [
		{ link: "/:std", component: ManagePage },
		{ link: "/", component: StudentPage },
	];

	return <NestedPage to={path} pages={pages} />;
}
