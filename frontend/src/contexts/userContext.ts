import { createContext, useState } from "react";
import { User } from "../types";

export type UserType = {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
};

export const UserContext = createContext<UserType>({
  user: undefined,
  setUser: undefined,
});
