import { addCommentOnIssue } from "./api";
import { JiraEvent } from "./types";

const commentContent =
  "Here is a comment that is created automatically from the jira `comment-issue-app`";

export async function run(event: JiraEvent) {
  try {
    const createdIssueId = event.issue.id;
    await addCommentOnIssue(createdIssueId, commentContent);
  } catch (error) {
    console.log(error);
  }
}
