import api, { FetchOptions, fetch, route } from "@forge/api";
import { Comment } from "./types";

const OPEN_AI_API_URL = `https://api.openai.com/v1/chat/completions`;

export const getIssueComments = async (issueKey: string): Promise<Comment[]> => {
  const response = await api.asApp().requestJira(route`rest/api/3/issue/${issueKey}/comment`);
  const data = (await response.json()) as { comments: Comment[] };
  return data.comments as Comment[];
};

const setRequestPayload = (prompt: string) => {
  return {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  };
};

export const summarizeWithChatGPT = async (prompt: string) => {
  const requestOptions: FetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_AI_API}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(setRequestPayload(prompt)),
  };

  try {
    const response = await fetch(OPEN_AI_API_URL, requestOptions);
    const result: any = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};
