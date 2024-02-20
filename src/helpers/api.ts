import api, { fetch, route } from "@forge/api";
import { IssueAssigneeDTO, UserGroupDTO } from "../types/dto";
import { User, UserAuthData } from "../types/user";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.asUser().requestJira(route`/rest/api/2/myself`, {
      headers: {
        Accept: "application/json",
      },
    });
    return (await response.json()) as User;
  } catch (error) {
    console.error(error);
  }
};

export const createNewJiraUser = async (
  newUserEmail: string,
  adminAuthData: UserAuthData
): Promise<User> => {
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
    const data = (await response.json()) as User;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getIssueAssignee = async (issueKey: string): Promise<IssueAssigneeDTO> => {
  try {
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/2/issue/${issueKey}?fields=assignee`, {
        headers: {
          Accept: "application/json",
        },
      });
    const data = (await response.json()) as IssueAssigneeDTO;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserGroups = async (accountId: string): Promise<UserGroupDTO[]> => {
  try {
    const response = await api
      .asUser()
      .requestJira(route`/rest/api/2/user/groups?accountId=${accountId}`, {
        headers: {
          Accept: "application/json",
        },
      });
    const data = (await response.json()) as UserGroupDTO[];
    return data;
  } catch (error) {
    console.error(error);
  }
};
