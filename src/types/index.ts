export interface Context {
  issue: IdKey;
  project: IdKey;
  user: User;
  transition: Transition;
}

interface IdKey {
  id: string;
  key: string;
}

interface User {
  accountId: string;
}

interface Transition {
  id: string;
  name: string;
  from: StatusId;
  to: StatusId;
}

interface StatusId {
  id: string;
}

export interface IssueData {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    assignee: null | any;
  };
}
