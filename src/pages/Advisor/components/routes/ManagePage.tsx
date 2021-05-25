import { useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import { ComponentTabs } from "@mbs/components"
import { useStudent } from "@mbs/services"
import { Thesis } from "./components/Tabs/Thesis"
import { JuryProposal } from "./components/Tabs/JuryProposal"
export function ManagePage() {
    const student = useStudent()
    const path = useRouteMatch()
    const pages = [
        { name: "Thesis", content: Thesis },
        { name: "Jury", content: JuryProposal }
    ]

    if (!student?.student) {
        return null
    }
    return (
        <ComponentTabs pages={pages} current={student?.student?.name_ + " " + student?.student?.surname} goBack={{ name: "Students", link: path.url }} />
    );
}