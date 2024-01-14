import api, { route } from "@forge/api";

export const addCommentOnIssue = async (issueId: string, commentContent: string) => {
  const response = await api.asApp().requestJira(route`/rest/api/2/issue/${issueId}/comment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: commentContent,
    }),
  });
  const data = await response.json();
  return data as Comment;
};
