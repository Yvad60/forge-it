import api, { route } from "@forge/api";
import ForgeUI, { Button, IssuePanel, render, useProductContext} from "@forge/ui";
ForgeUI;

const createUser = async () => {
  var bodyData = {
    emailAddress: "dieumeinnocent88@gmail.com",
  };

  try {
    const response = await api.asApp().requestJira(route`/rest/api/2/user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(await response.json());
  } catch (error) {
    console.log("here is the error", error);
  }
};

const App = () => {
  const {
    localId: panelId,
    extensionContext: { isNewToIssue },
  } = useProductContext();
  return (
    <IssuePanel>
      <Button text="Create user" onClick={createUser} />
    </IssuePanel>
  );
};
export const run = render(<App />);
