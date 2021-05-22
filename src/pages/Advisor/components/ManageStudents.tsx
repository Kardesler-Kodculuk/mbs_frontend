import { NestedPage } from "@mbs/components"
import { Welcome } from "@mbs/components"
import React, { useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import { UserContext, AuthContext, AlertContext } from "@mbs/contexts"
import { StudentPage } from "./routes/components/StudentPage"

export function ManageStudents() {
    const userContext = useContext(UserContext)
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    let { path, url } = useRouteMatch()


    let pages = [
        { link: "/", component: StudentPage },
        { link: "/evaluate/:std", component: Welcome },
        { link: "/student/:std", component: Welcome }
    ]

    return (
        <NestedPage to={path} pages={pages} />
    );
}