/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
import Avatar from "@atlaskit/avatar";
import { LoadingButton } from "@atlaskit/button";
import Form, { Label } from "@atlaskit/form";
import Select from "@atlaskit/select";
import { invoke } from "@forge/bridge";
import { FC, useState } from "react";
import { NewUserFormInputs } from "../types/form";
import { UserDTO } from "../types/frontend-dto";

type Props = {
  userAuthData: {
    emailAddress: string;
    accountId: string;
    siteurl: string;
  };
};

const NewUserForm: FC<Props> = ({ userAuthData }) => {
  const [inputValue, setInputValue] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdUser, setCreatedUser] = useState<UserDTO>();
  const [selectMinHeight, setSelectMinHeight] = useState<"auto" | "130px">("auto");
  const [formValue, setFormValue] = useState<NewUserFormInputs>();

  const handleClick = async () => {
    try {
      setIsSubmitting(true);
      const createdUser: UserDTO = await invoke("create-new-user", {
        newUserEmail: formValue?.[0].value,
        adminAuthData: { ...userAuthData },
      });
      setCreatedUser(createdUser);
      setIsSubmitting(false);
    } catch (error) {
      // Todo: handle the error case
    }
  };

  return (
    <div>
      <Form onSubmit={handleClick}>
        {({ formProps }) => (
          <form {...formProps}>
            <div
              className="my-3"
              style={{
                minHeight: selectMinHeight,
              }}
            >
              <Label htmlFor="new-users-emails">Emails of new users</Label>
              <Select
                onInputChange={(value) => setInputValue(value)}
                onChange={(currentFormValue) => setFormValue(currentFormValue as NewUserFormInputs)}
                onMenuClose={() => setSelectMinHeight("auto")}
                onMenuOpen={() => setSelectMinHeight("130px")}
                inputId="new-users-emails"
                isMulti
                noOptionsMessage={() => "Enter email to select"}
                options={inputValue ? [{ label: inputValue, value: inputValue }] : []}
                placeholder="Enter one or more email"
              />
            </div>
            <div className="mt-3">
              <LoadingButton type="submit" appearance="primary" isLoading={isSubmitting}>
                Submit
              </LoadingButton>
            </div>
          </form>
        )}
      </Form>
      {createdUser && (
        <div className="mt-6">
          <span className="font-semibold text-sm">Created user</span>
          <div className="mt-1 flex flex-col items-center w-fit">
            <Avatar
              size="medium"
              src={createdUser.avatarUrls["24x24"]}
              name={createdUser.displayName}
              status="approved"
            />
            <span className="text-[11px]">{createdUser.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewUserForm;
