/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@atlaskit/button";
import Form, { Label } from "@atlaskit/form";
import Select from "@atlaskit/select";
import { invokeRemote, view } from "@forge/bridge";
import React, { useEffect, useState } from "react";
React;

const App = () => {
  useEffect(() => {
    const loadJiraUITheme = async () => {
      await view.theme.enable();
    };
    loadJiraUITheme();
    document.getElementsByTagName("body")[0].style.backgroundColor = "transparent";
  }, []);

  const [inputValue, setInputValue] = useState<string>();
  const [selectMinHeight, setSelectMinHeight] = useState<"auto" | "130px">("auto");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formValue, setFormValue] = useState<any>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState<any>(null);

  const handleClick = async () => {
    try {
      const response = await invokeRemote({
        method: "GET",
        path: "/api/forge",
      });
      setData(JSON.stringify(response));
    } catch (error: any) {
      setData(error);
    }
  };

  return (
    <Form onSubmit={(value) => setFormValue(value)}>
      {() => (
        <div>
          <div style={{ minHeight: selectMinHeight, marginTop: "10px", marginBottom: "12px" }}>
            <Label htmlFor="new-users-emails">Emails of new users</Label>
            <Select
              onInputChange={(value) => setInputValue(value)}
              onChange={(formValue) => {
                setFormValue(formValue);
                setInputValue(undefined);
              }}
              onMenuClose={() => setSelectMinHeight("auto")}
              onMenuOpen={() => setSelectMinHeight("130px")}
              inputId="new-users-emails"
              isMulti
              noOptionsMessage={() => "Enter email to select"}
              options={inputValue ? [{ label: inputValue, value: inputValue }] : []}
              placeholder="Enter one or more email"
            />
          </div>
          <div>{data}</div>
          <Button onClick={() => setIsSubmitted(true)}>Submit</Button>
          <Button onClick={handleClick}>Submited</Button>

          {isSubmitted && (
            <p>
              {formValue && formValue.length > 0
                ? `Entered: ${formValue.map((val: { value: any }) => val.value).join(" ")}`
                : "No email provided"}
            </p>
          )}
        </div>
      )}
    </Form>
  );
};
export default App;
