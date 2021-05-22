import { User, Welcome } from "@mbs/components"
import { ManageStudents } from "./components/ManageStudents"
export function Advisor() {
  const Selections: string[] = ["Home", "Manage Student"]
  const Links: string[] = ["/home", "/manage-student"]
  const Contents: React.FC[] = [Welcome, ManageStudents]
  return <User selections={Selections} links={Links} contents={Contents} />;
}
