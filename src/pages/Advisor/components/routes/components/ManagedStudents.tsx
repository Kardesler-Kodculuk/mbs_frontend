/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useStudent, useQuery } from "@mbs/services"
import { Students, StudentData } from "@mbs/interfaces"
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import { TableRow, TableCell, IconButton, Button } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

export function ManagedStudents() {
    const [load, setLoad] = useState<boolean>(true)
    const [managed, setManaged] = useState<Students | null>(null)
    const [students, setStudents] = useState<StudentData[] | null>(null)
    const [defenders, setDefenders] = useState<StudentData[] | null>(null)
    const [defendingStudents, setDefendingStudents] = useState<StudentData[] | null>(null)
    const query = useQuery()
    const selectedStudent = useStudent()
    let path = useRouteMatch()

    useEffect(() => {
        async function fetchProposals() {
            await query?.queryID<Students>("students")
                .then(data => { setManaged(data); console.log(data) })
                .catch((err) => { })
        }
        fetchProposals()
    }, [load])

    useEffect(() => {
        async function fetchStudents() {
            if (managed) {
                await query?.queryInfo<StudentData>("students", managed.students.filter((student) => managed.defenders?.includes(student)))
                    .then(data => { setDefendingStudents(data); }).then(() => { })
                    .catch((err) => { console.log(err.response) })
                await query?.queryInfo<StudentData>("students", managed.students.filter((student) => !managed.defenders?.includes(student)))
                    .then(data => { setStudents(data); }).then(() => { })
                    .catch((err) => { console.log(err.response) })

                await query?.queryInfo<StudentData>("students", managed.defenders.filter((student) => !managed.students?.includes(student)))
                    .then(data => { setDefenders(data); }).then(() => { })
                    .catch((err) => { console.log(err.response) })
            }
        }
        fetchStudents()
    }, [managed])

    const handleSelection = (student: StudentData) => {
        selectedStudent?.setStudent(student)
    }

    return (
        <>
            {
                defendingStudents?.map((student) =>
                    <TableRow key={"table_row_" + student.name_+ "_" + student.user_id}>

                        <TableCell component="th" scope="row">
                            {student.name_ + " " + student.surname}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton
                                component={Link} to={path.url + "/" + student.user_id} onClick={() => handleSelection(student)}>
                                <OpenInNewIcon color="primary" />
                            </IconButton>
                            <Button variant="contained" color="primary" component={Link} to={path.url + "/evaluate/" + student.user_id} onClick={() => handleSelection(student)}>
                                {"Evaluate"}
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            }
            {
                defenders?.map((student) =>
                    <TableRow key={"table_row_" + student.name_+ "_" + student.user_id}>
                        <TableCell component="th" scope="row">
                            {student.name_ + " " + student.surname}
                        </TableCell>
                        <TableCell align="right">
                            <Button variant="contained" color="primary" component={Link} to={path.url + "/evaluate/" + student.user_id} onClick={() => handleSelection(student)}>
                                {"Evaluate"}
                            </Button>
                        </TableCell>

                    </TableRow>
                )
            }
            {
                students?.map((student) =>
                    <TableRow key={"table_row_" + student.name_+ "_" + student.user_id}>
                        <TableCell component="th" scope="row" >
                            {student.name_ + " " + student.surname}
                        </TableCell>
                        <TableCell align="right">
                            <IconButton
                                component={Link} to={path.url + "/" + student.user_id} onClick={() => handleSelection(student)}>
                                <OpenInNewIcon color="primary" />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )
            }

        </>
    );
}