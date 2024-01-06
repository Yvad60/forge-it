import ForgeUI, {
  Button,
  Fragment,
  IssuePanel,
  Text,
  render,
  useProductContext,
  useState,
} from "@forge/ui";
import { getIssueComments } from "./api";
import { JiraContext } from "./types";
import { extractTextFromComments } from "./helpers";
ForgeUI; // not being used directly but needed in the scope for forge/ui components

const App = () => {
  const context = useProductContext().platformContext as JiraContext;
  const issueKey = context.issueKey;
  const [summary, setState] = useState("");

  const handleClick = async () => {
    console.log("clicked");
    const comments = await getIssueComments(issueKey);
    setState(JSON.stringify(extractTextFromComments(comments)));
  };

  return (
    <Fragment>
      <Text>{summary}</Text>
      <Button text="Refresh" onClick={handleClick} />
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
