import { Label } from "@atlaskit/form";
import Select from "@atlaskit/select";
import Spinner from "@atlaskit/spinner";
import { invoke, view } from "@forge/bridge";
import { useEffect, useState } from "react";
import { UserGroupDTO } from "../types/frontend-dto";

const ReferenceUserDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userGroups, setUserGroups] = useState<UserGroupDTO[]>();
  const [selectMinHeight, setSelectMinHeight] = useState<"auto" | "230px">("auto");

  useEffect(() => {
    const loadUserGroups = async () => {
      const issueKey = (await view.getContext()).extension.issue.key;
      const referenceUserGroups: UserGroupDTO[] = await invoke("get-reference-user-groups", {
        issueKey,
      });
      setUserGroups(referenceUserGroups);
      setIsLoading(false);
    };
    loadUserGroups();
  }, []);

  if (isLoading)
    return (
      <span>
        <Spinner interactionName="load" size="small" /> Loading reference user...
      </span>
    );
  return (
    <div>
      <Label htmlFor="nothing">Reference user groups</Label>
      <div
        style={{
          minHeight: selectMinHeight,
        }}
      >
        <Select
          inputId="single-select-example"
          onMenuClose={() => setSelectMinHeight("auto")}
          onMenuOpen={() => setSelectMinHeight("230px")}
          options={userGroups?.map((group) => ({ label: group.name, value: group.groupId }))}
          placeholder="Choose reference groups"
          isMulti
        />
      </div>
    </div>
  );
};
export default ReferenceUserDetails;
