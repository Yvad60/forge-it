import ForgeUI, { IssueContext, Text, render } from "@forge/ui";
ForgeUI;

const App = () => {
  return <Text>Hello from the Issue context panel!</Text>;
};

export const primary = render(
  <IssueContext>
    <App />
  </IssueContext>
);
