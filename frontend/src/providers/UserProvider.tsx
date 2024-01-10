import { useEffect, useState } from "react";
import { User } from "../types";
import { UserContext } from "../contexts/userContext";

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    lastName: "",
    username: "",
    role: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
