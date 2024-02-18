import { WhereConditions, storage } from "@forge/api";
import { userDbName } from "../constants/storage";
import { CreateUserDTO } from "../types/dto";

export const saveUserToStorage = async (userData: CreateUserDTO) => {
  try {
    await storage.entity(userDbName).set(userData.accountId, userData);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getUserByEmailAddress = async (emailAddress: string) => {
  try {
    const result = await storage
      .entity(userDbName)
      .query()
      .index("emailAddress")
      .where(WhereConditions.equalsTo(emailAddress))
      .getOne();
    return result;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
