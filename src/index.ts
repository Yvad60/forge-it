import api, { route } from "@forge/api";
import { Context, IssueData } from "./types";

exports.run = async (context: Context) => {
  const triggeredIssueKey = context.issue.key;

  try {
    const response = await api
      .asApp()
      .requestJira(route`/rest/api/3/issue/${triggeredIssueKey}?fields=assignee`, {
        headers: {
          Accept: "application/json",
        },
      });

    const resData: IssueData = await response.json();
    return {
      result: Boolean(resData.fields.assignee),
      errorMessage: "The issue must have an assignee before transitioning.",
    };
  } catch (error) {
    console.log("here is the error", error);
  }
};
