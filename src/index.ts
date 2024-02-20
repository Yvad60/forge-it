import Resolver from "@forge/resolver";
import { createNewJiraUser, getCurrentUser, getIssueAssignee, getUserGroups } from "./helpers/api";
import { getUserByEmailAddress, saveUserToStorage } from "./helpers/storage";
import { Status } from "./types/common";
import { CreateUserDTO } from "./types/dto";

const resolver = new Resolver();

resolver.define("save-api-key", async ({ payload }) => {
  try {
    await saveUserToStorage(payload as CreateUserDTO);
    return {
      status: Status.Success,
    };
  } catch (error) {
    return {
      error,
      status: Status.Fail,
    };
  }
});

resolver.define("get-current-user", async () => {
  const currentUser = await getCurrentUser();
  return currentUser;
});

resolver.define("get-user-auth-data", async ({ payload }) => {
  const userAuthData = await getUserByEmailAddress(payload.emailAddress as string);
  return userAuthData;
});

resolver.define("create-new-user", async ({ payload }) => {
  const userEmails = payload.userEmails as string[];
  const response = [];
  for (const email of userEmails) {
    const userAuthData = await createNewJiraUser(email, payload.adminAuthData);
    response.push(userAuthData);
  }

  return response;
});

resolver.define("get-reference-user-groups", async ({ payload }) => {
  console.log(payload);
  const issueAssigne = await getIssueAssignee(payload.issueKey);
  const userGroups = await getUserGroups(issueAssigne.fields.assignee.accountId);
  return userGroups;
});

export const handler = resolver.getDefinitions();
