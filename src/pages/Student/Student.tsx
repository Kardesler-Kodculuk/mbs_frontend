import { User, Welcome } from "@mbs/components"
import { TopicForm } from "./components/TopicForm"
export function Student() {
  const Selections: string[] = ["Home", "Select Topic", "Manage Thesis", "Select Advisor"];
  const Links: string[] = ["/home", "/thesis-topic", "/manage-thesis", "/select-advisor"];
  const Contents: React.FC[] = [Welcome, TopicForm, Welcome, Welcome];
  return <User selections={Selections} links={Links} contents={Contents} />;
}
