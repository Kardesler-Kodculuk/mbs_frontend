import { useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import { ComponentTabs } from "@mbs/components"
import { useStudent } from "@mbs/services"
import { These } from "./components/Tabs/These"
export function ManagePage() {
    const student = useStudent()
    const path = useRouteMatch()
    const pages = [
        { name: "Thesis", content: These },
        { name: "Jury", content: () => ("aslkdşjawd") }
    ]

    if (!student?.student) {
        return <div />
    }
    return (
        <ComponentTabs pages={pages} current={student?.student?.name_ + " " + student?.student?.surname} goBack={{ name: "Students", link: path.url }} />
    );
}