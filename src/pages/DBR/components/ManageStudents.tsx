import { NestedPage } from "@mbs/components"
import { useRouteMatch } from "react-router-dom";
import { EvaluatePage } from "@mbs/components"
import { StudentPage } from "./routes"


export function ManageStudents() {

    let { path } = useRouteMatch()


    let pages = [
        { link: "/manage/:std", component: EvaluatePage },
        { link: "/", component: StudentPage },
    ]

    return (
        <NestedPage to={path} pages={pages} />
    );
}