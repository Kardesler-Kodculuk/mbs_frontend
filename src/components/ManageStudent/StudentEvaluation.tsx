import { useRouteMatch } from "react-router-dom";
import { ComponentTabs } from "@mbs/components"
import { useStudent } from "@mbs/services"
import { Evaluation } from "./Tab/EvaluationTab"


export function EvaluatePage() {
    const studentContext = useStudent()
    const path = useRouteMatch()
    const pages = [
        { name: "Evaluate", content: Evaluation },
    ]

    if (!studentContext?.student) {
        return <></>
    }
    return (
        <ComponentTabs pages={pages} current={studentContext?.student?.name_ + " " + studentContext?.student?.surname} goBack={{ name: "Students", link: path.url }} />
    );
}