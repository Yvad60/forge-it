import api, { route } from "@forge/api";
import { Comment } from "./types";

export const getIssueComments = async (issueKey: string): Promise<Comment[]> => {
  const response = await api.asApp().requestJira(route`rest/api/3/issue/${issueKey}/comment`);
  const data = await response.json();
  return data.comments as Comment[];
};
