import api, { route } from "@forge/api";
import { Page } from "./types/page";

export const getPageData = async (pageId: string): Promise<Page> => {
  const response = await api.asUser().requestConfluence(route`/wiki/api/v2/pages/${pageId}`, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data as Page;
};
