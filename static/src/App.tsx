import Button from "@atlaskit/button";
import { view } from "@forge/bridge";
import React, { useEffect } from "react";
React;

const App = () => {
  useEffect(() => {
    const loadJiraUITheme = async () => {
      await view.theme.enable();
    };
    loadJiraUITheme();
    document.getElementsByTagName("body")[0].style.backgroundColor = "transparent";
  }, []);

  return (
    <div>
      <span>Hello there how are you now how are you</span>
      <Button>Default button</Button>
    </div>
  );
};
export default App;
