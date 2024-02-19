import { LoadingButton } from "@atlaskit/button";
import Form, { ErrorMessage, Field, FormHeader, FormSection, Label } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { invoke, view } from "@forge/bridge";
import { FC } from "react";
import { Status } from "../types/common";
import { ApiKeyFormInputs } from "../types/form";
import { SaveApiKeyResponse } from "../types/frontend-dto";
import Link from "./Link";

type Props = {
  currentUserData: {
    emailAddress: string;
    accountId: string;
  };
};

const ApiKeyForm: FC<Props> = ({ currentUserData }) => {
  const handleSubmit = async (userApiKey: string) => {
    if (currentUserData == null) return;
    const context = await view.getContext();

    const result: SaveApiKeyResponse = await invoke("save-api-key", {
      emailAddress: currentUserData.emailAddress,
      accountId: currentUserData.accountId,
      apiKey: userApiKey,
      siteurl: context.siteUrl,
    });

    if (result.status === Status.Success) {
      console.log("success");
    } else {
      console.log("failed");
    }
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
                  to get your account key
                </span>
              </p>
            </FormHeader>
            <FormSection>
              <Field
                name="apiKey"
                id="api-key-input"
                validate={(value) => {
                  if (value == null || !value.trim()) return "Please enter your API Key";
                  if (value.length < 10) return "Please enter a valid API key";
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
