/* eslint-disable react-hooks/exhaustive-deps */
import { UserTable } from "@mbs/components"
import { ManagedStudents } from "./components/ManagedStudents"


export function StudentPage() {



    return (
        <div>
            <UserTable title={"Previously Uploaded Students"}>
                <ManagedStudents />
            </UserTable>
        </div>
    );
}