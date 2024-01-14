export interface JiraEvent {
  eventType: string;
  issue: Issue;
  atlassianId: string;
  associatedUsers: AssociatedUsers;
}

interface Issue {
  id: string;
  key: string;
  fields: {
    summary?: string;
    issueType?: any;
    creator?: any;
    created?: string;
    project?: any;
    reporter?: User;
    assignee?: User | null;
    updated?: string;
    status?: any;
  };
}

interface AssociatedUsers {
  associatedUsers: User[];
}

interface User {
  accountId: string;
}

interface AvatarUrls {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
}

interface Author {
  self: string;
  accountId: string;
  avatarUrls: AvatarUrls;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: string;
}

export interface Content {
  type?:
    | "text"
    | "mediaSingle"
    | "media"
    | "file"
    | "paragraph"
    | "doc"
    | "codeBlock"
    | "emoji"
    | "mention"
    | "textColor"
    | "bulletList"
    | "listItem";
  content?: Content[];
  text?: string;
  attrs?: object;
  marks?: object;
}

interface CommentBody {
  version: number;
  type: string;
  content: Content[];
}

export interface Comment {
  self: string;
  id: string;
  author: Author;
  body: CommentBody;
  updateAuthor: Author;
  created: string;
  updated: string;
  jsdPublic: boolean;
}
