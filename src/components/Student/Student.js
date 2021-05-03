import React from "react";
import Welcome from "../User/Welcome";
import User from "../User/User";
import TopicForm from "./TopicForm";
import AdvisorProposal from "./AdvisorProposal";
export default function Student() {
	const Selections = ["Home", "Select Topic", "Manage Thesis", "Select Advisor"];
	const Contents = [<Welcome />, <TopicForm />, "Manage Thesis", <AdvisorProposal />];
	const Links = ["/home", "/thesis-topic", "/manage-thesis", "/select-advisor"];

	return <User selections={Selections} links={Links} contents={Contents} />;
}
