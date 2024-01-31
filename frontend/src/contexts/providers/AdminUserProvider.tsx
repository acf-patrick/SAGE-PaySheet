import { useState } from "react";
import RoleContext from "../AdminUser";

function AdminUserProvider({ children }: { children: any }) {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  return (
    <RoleContext.Provider
      value={{
        isUserAdmin,
        setIsUserAdmin,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export default AdminUserProvider;
