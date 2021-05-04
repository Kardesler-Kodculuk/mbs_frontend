import React from "react";

import Welcome from "../User/Welcome";
import User from "../User/User";
import ManageStudents from "./ManageStudents";

//Renders Advisors Page
//Uses User function as a Template
export default function Advisor() {
	const Selections = ["Home", "Manage Student"];
	const Contents = [<Welcome />, <ManageStudents />];
	const Links = ["/home", "/manage-student"];
	return <User selections={Selections} links={Links} contents={Contents} />;
}
