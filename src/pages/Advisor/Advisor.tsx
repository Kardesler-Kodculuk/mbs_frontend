import { User, Welcome } from "@mbs/components"

export function Advisor() {
  const Selections: string[] = ["Home", "Manage Student"]
  const Links: string[] = ["/home", "/manage-student"]
  const Contents: React.FC[] = [Welcome, Welcome, Welcome, Welcome]
  return <User selections={Selections} links={Links} contents={Contents} />;
}
