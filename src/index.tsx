import ForgeUI, { Form, IssuePanel, Macro, Text, TextField, render, useState } from "@forge/ui";

ForgeUI;

const App = () => {
  const [formState, setFormState] = useState(undefined);

  const onSubmit = async (formData) => {
    setFormState(formData);
  };

  return (
    <IssuePanel>
      <Form onSubmit={onSubmit} submitButtonText="Create user">
        <TextField name="email" label="Email" placeholder="Enter new user email" />
      </Form>
      {formState && formState.email && <Text>You entered {JSON.stringify(formState.email)}</Text>}
      {formState && !formState.email && <Text>You didn't enter anything</Text>}
    </IssuePanel>
  );
};

export const run = render(<Macro app={<App />} />);
