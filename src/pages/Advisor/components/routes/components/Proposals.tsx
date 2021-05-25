/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useQuery, useAlert, useUser } from "@mbs/services"
import { Proposal, StudentData } from "@mbs/interfaces"
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { TableRow, TableCell, IconButton } from "@material-ui/core";


export function Proposals() {
    const [load, setLoad] = useState<boolean>(true)
    const [students, setStudents] = useState<StudentData[] | null>(null)
    const [proposals, setProposals] = useState<Proposal[] | null>(null)
    const query = useQuery()
    const selectedStudent = useUser()
    const alert = useAlert()
    useEffect(() => {
        if (alert) {
            alert.createAlert("success", "advisor_proposal", "Proposal has been sent.", "success")
            alert.createAlert("alert", "advisor_proposal", "Please enter your thesis topic before proposing to an advisor.", "warning")
        }
    }, [])

    useEffect(() => {
        async function fetchProposals() {
            await query?.queryID<Proposal[]>("proposals")
                .then(data => { setProposals(data) })
                .catch((err) => { })
        }
        fetchProposals()
    }, [load])

    useEffect(() => {
        async function fetchStudents() {
            if (proposals) {
                await query?.queryInfo<StudentData>("students", proposals?.map((r => r.student_id)))
                    .then(data => { setStudents(data); }).then(() => { })
                    .catch((err) => { console.log(err.response) })
            }
        }
        fetchStudents()
    }, [proposals])

    const handleApprove = async (student: StudentData) => {
        setLoad(!load)
    }

    const handleReject = async (student: StudentData) => {
        setLoad(!load)
    }
    return (
        <>
            {
                students?.map((student) =>
                    <TableRow key={"table_row_" + student.name_+ "_" + student.user_id}>
                        <TableCell>
                            <IconButton
                                onClick={() => handleApprove(student)}>
                                <CheckIcon color="primary" />
                            </IconButton>
                            <IconButton
                                onClick={() => handleReject(student)}>
                                <ClearIcon color="primary" />
                            </IconButton>
                        </TableCell>
                        <TableCell component="th" scope="row" align="right">
                            {student.name_ + " " + student.surname}
                        </TableCell>
                    </TableRow>
                )
            }
        </>
    );
}