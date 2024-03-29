import { NestedPage } from "@mbs/components"
import { useRouteMatch } from "react-router-dom";
import { EvaluatePage } from "@mbs/components"
import { StudentPage, ManagePage } from "./routes"


export function ManageStudents() {

    let { path, url } = useRouteMatch()


    let pages = [
        { link: "/evaluate/:std", component: EvaluatePage },
        { link: "/:std", component: ManagePage },
        { link: "/", component: StudentPage },
    ]

    return (
        <NestedPage to={path} pages={pages} />
    );
}