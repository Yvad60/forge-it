import api, { route } from "@forge/api";
import { CurrentUser } from "../types/user";

export const getCurrentUser = async (): Promise<CurrentUser> => {
  try {
    const response = await api.asUser().requestJira(route`/rest/api/2/myself`, {
      headers: {
        Accept: "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log("error occured");
    console.error(error);
  }
};
