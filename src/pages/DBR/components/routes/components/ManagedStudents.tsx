/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useQuery, useAlert, useStudent } from "@mbs/services"
import { Students, StudentData } from "@mbs/interfaces"
import { TableRow, TableCell, Button } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

export function ManagedStudents() {
    const [load, setLoad] = useState<boolean>(true)
    const [managed, setManaged] = useState<Students | null>(null)
    const [students, setStudents] = useState<StudentData[] | null>(null)
    const query = useQuery()
    const selectedStudent = useStudent()
    const alert = useAlert()

    let path = useRouteMatch()

    useEffect(() => {
        async function fetchProposals() {
            await query?.queryID<Students>("students")
                .then(data => { setManaged(data) })
                .catch((err) => { })
        }
        fetchProposals()
    }, [load])

    useEffect(() => {
        async function fetchStudents() {
            if (managed) {
                await query?.queryInfo<StudentData>("students", managed.students)
                    .then(data => { setStudents(data); }).then(() => { })
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
                students?.map((student) =>
                    <TableRow key={"table_row_" + student.name_}>
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
        </>
    );
}