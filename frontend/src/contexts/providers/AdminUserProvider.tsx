import { useState } from "react";
import AdminUser from "../AdminUser";

function AdminUserProvider({ children }: { children: any }) {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  return (
    <AdminUser.Provider
      value={{
        isUserAdmin,
        setIsUserAdmin,
      }}
    >
      {children}
    </AdminUser.Provider>
  );
}

export default AdminUserProvider;
