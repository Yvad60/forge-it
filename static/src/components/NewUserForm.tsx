/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
import Avatar from "@atlaskit/avatar";
import { LoadingButton } from "@atlaskit/button";
import Form, { Label } from "@atlaskit/form";
import Select from "@atlaskit/select";
import { invoke } from "@forge/bridge";
import { FC, useState } from "react";
import { NewUserFormInputs } from "../types/form";
import { UserDTO } from "../types/frontend-dto";
import ReferenceUserDetails from "./ReferenceUserDetails";

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
  const [createdUsers, setCreatedUsers] = useState<UserDTO[]>();
  const [selectMinHeight, setSelectMinHeight] = useState<"auto" | "130px">("auto");
  const [formValue, setFormValue] = useState<NewUserFormInputs>();

  const handleClick = async () => {
    const userEmails = formValue?.map((option) => option.value);
    try {
      setIsSubmitting(true);
      const createdUsers: UserDTO[] = await invoke("create-new-user", {
        userEmails: userEmails,
        adminAuthData: { ...userAuthData },
      });
      setCreatedUsers(createdUsers);
      setIsSubmitting(false);
    } catch (error) {
      // Todo: handle the error case
    }
  };

  return (
    <div className="pr-2">
      <div className="grid grid-cols-2">
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
                  onChange={(currentFormValue) =>
                    setFormValue(currentFormValue as NewUserFormInputs)
                  }
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
                  Create users
                </LoadingButton>
              </div>
            </form>
          )}
        </Form>
        <div className="ml-8 mt-3">
          <ReferenceUserDetails/>
        </div>
      </div>

      {createdUsers && (
        <div className="mt-6">
          <span className="font-semibold text-sm">Created users</span>
          <div className="flex gap-1">
            {createdUsers.map((user) => {
              return (
                <div className="mt-1 flex flex-col items-center w-fit">
                  <Avatar
                    size="medium"
                    src={user.avatarUrls["24x24"]}
                    name={user.displayName}
                    status="approved"
                  />
                  <span className="text-[11px]">{user.displayName}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default NewUserForm;
