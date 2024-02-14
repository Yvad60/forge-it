import ForgeUI, {
  Form,
  IssuePanel,
  Macro,
  Option,
  Select,
  Text,
  TextField,
  render,
  useState,
} from "@forge/ui";

ForgeUI;

const App = () => {
  const [formState, setFormState] = useState(undefined);

  const onSubmit = async (formData) => {
    console.log("here is the fore data", formData);
    setFormState(formData);
  };

  return (
    <IssuePanel>
      <Form onSubmit={onSubmit} submitButtonText="Create user">
        <TextField name="email" label="Email" placeholder="Enter new user email" />
        <Select label="With a defaultSelected" name="milestone" isMulti>
          <Option defaultSelected label="Milestone 1" value="one" />
          <Option label="Milestone 2" value="two" />
          <Option label="Milestone 3" value="three" />
        </Select>
      </Form>
      {formState && formState.email && <Text>You entered {JSON.stringify(formState.email)}</Text>}
      {formState && !formState.email && <Text>You didn't enter anything</Text>}
    </IssuePanel>
  );
};

export const run = render(<Macro app={<App />} />);
