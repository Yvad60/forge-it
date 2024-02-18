import { Status, UserAuthData } from "./common";

export type CurrentUserDTO = {
  self: string;
  accountId: string;
  accountType: string;
  emailAddress: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  locale: string;
  groups: GroupsAndRoles;
  applicationRoles: GroupsAndRoles;
  expand: string;
};

export type UserAuthDataDTO = {
  key: string;
  value: UserAuthData;
};

type AvatarUrls = {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
};

type GroupsAndRoles = {
  size: number;
  items: string[];
};

export type SaveApiKeyResponse = {
  status: Status;
  error?: string;
};
