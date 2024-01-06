export interface JiraContext {
  issueId: string;
  issueKey: string;
  issueType: string;
  issueTypeId: string;
  projectId: string;
  projectKey: string;
  type: string;
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

interface Content {
  type: string;
  text: string;
}

interface ContentParagraph {
  type: string;
  content: Content[];
}

interface CommentBody {
  version: number;
  type: string;
  content: ContentParagraph[];
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
