/* eslint-disable react-hooks/exhaustive-deps */
import { UserTable } from "@mbs/components"
import { ManagedStudents } from "./components/ManagedStudents"


export function StudentPage() {



    return (
        <div>
            <UserTable title={"Students"}>
                <ManagedStudents />
            </UserTable>
        </div>
    );
}