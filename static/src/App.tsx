import { view } from "@forge/bridge";
import { useEffect } from "react";
import ApiKeyForm from "./components/ApiKeyForm";

const App = () => {
  useEffect(() => {
    const loadJiraUITheme = async () => {
      await view.theme.enable();
    };
    loadJiraUITheme();
    document.getElementsByTagName("body")[0].style.backgroundColor = "transparent";
  }, []);
  return <ApiKeyForm />;
};
export default App;
