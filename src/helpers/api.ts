import api, { fetch, route } from "@forge/api";
import { CurrentUser, UserAuthData } from "../types/user";

export const getCurrentUser = async (): Promise<CurrentUser> => {
  try {
    const response = await api.asUser().requestJira(route`/rest/api/2/myself`, {
      headers: {
        Accept: "application/json",
      },
    });
    return (await response.json()) as CurrentUser;
  } catch (error) {
    console.error(error);
  }
};

export const createNewJiraUser = async (
  newUserEmail: string,
  adminAuthData: UserAuthData
): Promise<CurrentUser> => {
  try {
    const response = await fetch(`${adminAuthData.siteurl}/rest/api/2/user`, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${adminAuthData.emailAddress}:${adminAuthData.apiKey}`
        ).toString("base64")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        emailAddress: newUserEmail,
      }),
    });
    const data = (await response.json()) as CurrentUser;
    return data;
  } catch (error) {
    console.error(error);
  }
};
