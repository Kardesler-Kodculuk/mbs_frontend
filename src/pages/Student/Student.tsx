import { User, Welcome } from "@mbs/components"
import { TopicForm } from "./components/TopicForm"
import { AdvisorProposal } from "./components/AdvisorProposal"
import { Theses } from "./components/Theses"
export function Student() {
  const Selections: string[] = ["Home", "Select Topic", "Manage Thesis", "Select Advisor"];
  const Links: string[] = ["/home", "/thesis-topic", "/manage-thesis", "/select-advisor"];
  const Contents: React.FC[] = [Welcome, TopicForm, Theses, AdvisorProposal];
  return <User selections={Selections} links={Links} contents={Contents} />;
}
