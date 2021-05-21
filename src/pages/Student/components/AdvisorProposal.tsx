import React, { useEffect, useState, useContext } from "react";
import { UserContext, QueryContext, AlertContext } from "@mbs/contexts";
import CheckIcon from "@material-ui/icons/Check";
import { UserTable } from "@mbs/components"
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

export default function AdvisorProposal() {

    const queryContext = useContext(QueryContext)
    const userContext = useContext(UserContext)
    const alertContext = useContext(AlertContext)

    useEffect(() => {
        if (alertContext) {
            alertContext.createAlert("success", "advisor_proposal", "Proposal has been sent.", "success")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleProposal = async (advisor: string) => {
        alertContext?.openAlert("success", "topic_form")
    }

    return (
        <div>
            {userContext?.user?.student?.has_proposed ? (
                <Alert severity="info">You already proposed to an advisor, please wait for response!</Alert>
            ) : (
                <UserTable title={"Previously Uploaded Advisors"}>
                </UserTable>
            )}
        </div>
    );
}