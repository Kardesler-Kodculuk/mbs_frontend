/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { UserContext, QueryContext, AlertContext } from "@mbs/contexts";
import { Students, StudentData } from "@mbs/interfaces"
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { UserTable } from "@mbs/components"
import { TableRow, TableCell, IconButton, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link, useLocation } from "react-router-dom";
export function ManagedStudents() {
    const [load, setLoad] = useState<boolean>(true)
    const [managed, setManaged] = useState<Students | null>(null)
    const [students, setStudents] = useState<StudentData[] | null>(null)
    const [defenders, setDefenders] = useState<StudentData[] | null>(null)
    const [defendingStudents, setDefendingStudents] = useState<StudentData[] | null>(null)
    const queryContext = useContext(QueryContext)
    const userContext = useContext(UserContext)
    const alertContext = useContext(AlertContext)
    let path = useLocation()
    useEffect(() => {
        if (alertContext) {
            alertContext.createAlert("success", "advisor_proposal", "Proposal has been sent.", "success")
            alertContext.createAlert("alert", "advisor_proposal", "Please enter your thesis topic before proposing to an advisor.", "warning")
        }
    }, [])

    useEffect(() => {
        async function fetchProposals() {
            await queryContext?.queryID<Students>("students")
                .then(data => { setManaged(data) })
                .catch((err) => { })
        }
        fetchProposals()
    }, [load])

    useEffect(() => {
        async function fetchStudents() {
            if (managed) {
                await queryContext?.queryInfo<StudentData>("students", managed.students.filter((student) => managed.defenders?.includes(student)))
                    .then(data => { setDefendingStudents(data); console.log(data) }).then(() => { })
                    .catch((err) => { console.log(err.response) })
                await queryContext?.queryInfo<StudentData>("students", managed.students.filter((student) => !managed.defenders?.includes(student)))
                    .then(data => { setStudents(data); console.log(data) }).then(() => { })
                    .catch((err) => { console.log(err.response) })
                await queryContext?.queryInfo<StudentData>("students", managed.defenders.filter((student) => !managed.students?.includes(student)))
                    .then(data => { setDefenders(data); console.log(data) }).then(() => { })
                    .catch((err) => { console.log(err.response) })
            }
        }
        fetchStudents()
    }, [managed])
    console.log(path)
    const handleManage = async (student: StudentData) => {

    }

    const handleEvaluate = async (student: StudentData) => {

    }
    return (
        <>
            {
                defendingStudents?.map((student) =>
                    <TableRow key={"table_row_" + student.name_}>

                        <TableCell component="th" scope="row">
                            {student.name_ + " " + student.surname}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton
                                component={Link} to={path + "manage/" + student.user_id}>
                                <OpenInNewIcon color="primary" />
                            </IconButton>
                            <Button variant="contained" color="primary" component={Link} to={path + "evaluate/" + student.user_id}>
                                {"Evaluate"}
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            }
            {
                defenders?.map((student) =>
                    <TableRow key={"table_row_" + student.name_}>
                        <TableCell component="th" scope="row">
                            {student.name_ + " " + student.surname}
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="primary" component={Link} to={path + "evaluate/" + student.user_id}>
                                {"Evaluate"}
                            </Button>
                        </TableCell>

                    </TableRow>
                )
            }
            {
                students?.map((student) =>
                    <TableRow key={"table_row_" + student.name_}>
                        <TableCell component="th" scope="row" >
                            {student.name_ + " " + student.surname}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton
                                component={Link} to={path + "manage/" + student.user_id}>
                                <OpenInNewIcon color="primary" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )
            }

        </>
    );
}