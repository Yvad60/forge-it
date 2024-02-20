import { IssueAssigne } from "./user";

export type CreateUserDTO = {
  emailAddress: string;
  accountId: string;
  apiKey: string;
};

export type IssueAssigneeDTO = {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    assignee: IssueAssigne;
  };
};

export type UserGroupDTO = {
  name: string;
  groupId: string;
  self: string;
};
