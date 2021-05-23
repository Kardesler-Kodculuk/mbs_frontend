/* eslint-disable react-hooks/exhaustive-deps */
import { UserTable } from "@mbs/components"
import { Proposals } from "./components/Proposals"
import { ManagedStudents } from "./components/ManagedStudents"


export function StudentPage() {



    return (
        <div>
            <UserTable title={"Previously Uploaded Students"}>
                <ManagedStudents />
                <Proposals />
            </UserTable>
        </div>
    );
}