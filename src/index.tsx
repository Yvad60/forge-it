import ForgeUI, {
  Fragment,
  IssuePanel,
  Text,
  render,
  useProductContext,
  useState,
} from "@forge/ui";
import { getIssueComments, summarizeWithChatGPT } from "./api";
import { extractTextFromComments } from "./helpers";
import { JiraContext } from "./types";
ForgeUI; // not being used directly but needed in the scope for forge/ui components

const App = () => {
  const context = useProductContext().platformContext as JiraContext;
  const issueKey = context.issueKey;
  const [summary] = useState(async () => {
    const comments = await getIssueComments(issueKey);
    const commentsText = extractTextFromComments(comments);
    const prompt = `Here is a sample data where all the comments of a jira issue is joined together:
    "${commentsText}". I want to summarize this in a way that anybody can get an idea what's going on in this issue without going through all the comments. Create a summary or TLDR for this.`;

    const summary = await summarizeWithChatGPT(prompt);
    return summary;
  });

  return (
    <Fragment>
      <Text>{summary}</Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
