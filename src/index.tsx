import ForgeUI, { render, IssueGlance, Text } from "@forge/ui";
ForgeUI

const App = () => {
  return <Text>Hello from the Issue glance!</Text>;
};

export const run = render(
  <IssueGlance>
    <App />
  </IssueGlance>
);
