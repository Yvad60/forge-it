import Resolver from "@forge/resolver";
import { getCurrentUser } from "./helpers";

const resolver = new Resolver();

resolver.define("save-api-key", ({ payload, context }) => {
  console.log(context, payload);
  return { example: `Hello, ${payload.name}!` };
});

resolver.define("get-current-user", async ({ payload, context }) => {
  console.log(context, payload);
  const currentUser = await getCurrentUser();
  return currentUser;
});

export const handler = resolver.getDefinitions();
