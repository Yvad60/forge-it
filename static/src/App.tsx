import Spinner from "@atlaskit/spinner";
import { invoke, view } from "@forge/bridge";
import { useEffect, useState } from "react";
import ApiKeyForm from "./components/ApiKeyForm";
import NewUserForm from "./components/NewUserForm";
import { UserAuthData } from "./types/common";
import { UserAuthDataDTO, UserDTO } from "./types/frontend-dto";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserDTO>();
  const [userAuthData, setUserAuthData] = useState<UserAuthData>();

  useEffect(() => {
    const loadAppContext = async () => {
      await view.theme.enable();
      const currentUser: UserDTO = await invoke("get-current-user");
      const userAuthDataResponse: UserAuthDataDTO = await invoke("get-user-auth-data", {
        emailAddress: currentUser.emailAddress,
      });

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
          accountId: currentUser.accountId,
        }}
      />
    );

  return <NewUserForm userAuthData={userAuthData} />;
};
export default App;
