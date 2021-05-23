/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { useQuery, useAlert, useUser } from "@mbs/services"
import { Recommendation, AdvisorData } from "@mbs/interfaces"
import CheckIcon from "@material-ui/icons/Check";
import { UserTable } from "@mbs/components"
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";


export function AdvisorProposal() {
    const [load, setLoad] = useState<boolean>(true)
    const [advisors, setAdvisors] = useState<AdvisorData[] | null>(null)
    const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null)
    const query = useQuery()
    const user = useUser()
    const alert = useAlert()

    useEffect(() => {
        if (alert) {
            alert.createAlert("success", "advisor_proposal", "Proposal has been sent.", "success")
            alert.createAlert("alert", "advisor_proposal", "Please enter your thesis topic before proposing to an advisor.", "warning")
        }
    }, [])

    useEffect(() => {
        async function fetchRecommendations() {
            await query?.queryID<Recommendation[]>("recommendations")
                .then(data => { setRecommendations(data) })
                .catch((err) => { })
        }
        fetchRecommendations()
    }, [load])

    useEffect(() => {
        async function fetchAdvisors() {
            if (recommendations) {
                console.log(recommendations)
                await query?.queryInfo<AdvisorData>("advisors", recommendations?.map((r => r.advisor_id)))
                    .then(data => { setAdvisors(data); console.log(advisors) }).then(() => { })
                    .catch((err) => { console.log(err.response) })
            }
        }
        fetchAdvisors()
    }, [recommendations])

    const handleProposal = async (advisor: AdvisorData) => {
        await query?.postActionWithBody("proposals", { "advisor_id": advisor.user_id })
            .then(() => { alert?.openAlert("success", "advisor_proposal"); })
            .catch((err) => {
                if (err?.response?.status === 409) {
                    alert?.openAlert("alert", "advisor_proposal")
                }
            })
        setAdvisors(null)
        setRecommendations(null)
        setLoad(!load)
    }


    return (
        <div>
            {user?.user?.student?.has_proposed ? (
                <Alert severity="info">You already proposed to an advisor, please wait for response!</Alert>
            ) : (
                <UserTable title={"Previously Uploaded Advisors"}>
                    {
                        advisors?.map((advisor) =>
                            <TableRow key={"table_row_" + advisor.name_}>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleProposal(advisor)}>
                                        <CheckIcon color="primary" />
                                    </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row" align="right">
                                    {advisor.name_ + " " + advisor.surname}
                                </TableCell>
                            </TableRow>
                        )
                    }
                </UserTable>
            )}
        </div>
    );
}