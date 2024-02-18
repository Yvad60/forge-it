import Spinner from "@atlaskit/spinner";
import { invoke, view } from "@forge/bridge";
import { useEffect, useState } from "react";
import ApiKeyForm from "./components/ApiKeyForm";
import { UserAuthData } from "./types/common";
import { CurrentUserDTO, UserAuthDataDTO } from "./types/dto";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUserDTO>();
  const [userAuthData, setUserAuthData] = useState<UserAuthData>();

  useEffect(() => {
    const loadAppContext = async () => {
      const currentUser: CurrentUserDTO = await invoke("get-current-user");
      const userAuthDataResponse: UserAuthDataDTO = await invoke("get-user-auth-data", {
        emailAddress: currentUser.emailAddress,
      });
      await view.theme.enable();

      setCurrentUser(currentUser);
      setUserAuthData(userAuthDataResponse.value);
      setIsLoading(false);
    };
    loadAppContext();
    document.getElementsByTagName("body")[0].style.backgroundColor = "transparent";
  }, []);

  if (isLoading) return <Spinner interactionName="load" size="medium" />;

  if (!currentUser) return <p>Error occured please restart the app</p>;

  if (!userAuthData)
    return (
      <ApiKeyForm
        currentUserData={{
          emailAddress: currentUser.emailAddress,
          accountId: currentUser.emailAddress,
        }}
      />
    );

  return <span> You are known welcome</span>;
};
export default App;
