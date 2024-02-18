import { LoadingButton } from "@atlaskit/button";
import Form, { ErrorMessage, Field, FormHeader, FormSection, Label } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { invoke } from "@forge/bridge";
import { useEffect, useState } from "react";
import { CurrentUserDTO } from "../types/dto";
import { ApiKeyFormInputs } from "../types/form";
import Link from "./Link";

const ApiKeyForm = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState<string>();

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser: CurrentUserDTO = await invoke("get-current-user");
      setCurrentUserEmail(currentUser.emailAddress);
    };
    getCurrentUser();
  }, []);

  const handleSubmit = async (userApiKey: string) => {
    const result = await invoke("save-api-key", {
      userEmail: currentUserEmail,
      apiKey: userApiKey,
    });
    console.log("My name is", result);
  };

  return (
    <div>
      <Form<ApiKeyFormInputs> onSubmit={({ apiKey }) => handleSubmit(apiKey)}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <FormHeader>
              <p>
                <span className="block text-[15px]">
                  Please provide your account API key before you continue.
                </span>
                <span className="block mt-2">
                  <Link href="https://id.atlassian.com/manage-profile/security/api-tokens">
                    Click here
                  </Link>{" "}
                  to get your account key now
                </span>
              </p>
            </FormHeader>
            <FormSection>
              <Field
                name="username"
                id="api-key-input"
                validate={(value) => {
                  if (value) return undefined;
                  return "Please enter your API Key";
                }}
              >
                {({ fieldProps, error }) => (
                  <div className="-mt-1">
                    <Label htmlFor={fieldProps.id}>API key</Label>
                    <TextField autoComplete="off" {...fieldProps} />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </div>
                )}
              </Field>
              <div className="mt-3">
                <LoadingButton type="submit" appearance="primary" isLoading={submitting}>
                  Submit
                </LoadingButton>
              </div>
            </FormSection>
          </form>
        )}
      </Form>
    </div>
  );
};
export default ApiKeyForm;
