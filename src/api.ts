import api, { FetchOptions, fetch, route } from "@forge/api";
import { Page, PageUpdate } from "./types/page";

const OPEN_AI_API_URL = "https://api.openai.com/v1/chat/completions";

export const addLabelsToPage = async (pageId: string, labels: string[]): Promise<PageUpdate> => {
  console.log(labels.map((label) => ({ prefix: "global", name: label.split(" ").join("-") })));
  const response = await api
    .asUser()
    .requestConfluence(route`/wiki/rest/api/content/${pageId}/label`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        labels.map((label) => ({ prefix: "global", name: label.split(" ").join("-") }))
      ),
    });
  const data = await response.json();
  return data as PageUpdate;
};

const setOpenAiRequestPayload = (prompt: string) => {
  return {
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  };
};

export const generateLabelsWithChatGPT = async (prompt: string) => {
  const requestOptions: FetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(setOpenAiRequestPayload(prompt)),
  };

  try {
    const response = await fetch(OPEN_AI_API_URL, requestOptions);
    const result: any = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};

export const getPageData = async (pageId: string): Promise<Page> => {
  const response = await api
    .asUser()
    .requestConfluence(route`/wiki/api/v2/pages/${pageId}?body-format=storage`, {
      headers: {
        Accept: "application/json",
      },
    });
  const data = await response.json();
  return data as Page;
};
