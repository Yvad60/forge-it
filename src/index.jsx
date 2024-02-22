import ForgeUI, { render, Fragment, Text, IssuePanel } from "@forge/ui";
import api, { route } from "@forge/api";

const App = () => {
  return (
    <Fragment>
      <Text>Hello world!</Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
const createUser = async () => {
  const bodyData = `{
  "emailAddress": "mia@atlassian.com"
}`;

  const response = await api.requestJira(route`/rest/api/2/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyData,
  });

  console.log(`Response: ${response.status} ${response.statusText}`);
  console.log(await response.json());
};
