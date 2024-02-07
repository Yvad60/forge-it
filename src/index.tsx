import ForgeUI, { AdminPage, render, Text } from "@forge/ui";
ForgeUI;

// When using the jira:adminPage the trigger function must return a function that will display the AdminPage
const App = () => {
  return (
    <AdminPage>
      <Text>Hello, world! from the admin page app</Text>
    </AdminPage>
  );
};

export const run = render(<App />);
