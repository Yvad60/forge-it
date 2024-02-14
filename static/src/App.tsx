import { view } from "@forge/bridge";
import { useEffect } from "react";

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
      <span>Hello there how are you</span>
    </div>
  );
};
export default App;
