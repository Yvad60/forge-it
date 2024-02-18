export enum Status {
  Success = "SUCCESS",
  Fail = "FAIL",
}

export type UserAuthData = {
  emailAddress: string;
  accountId: string;
  apiKey: string;
};
