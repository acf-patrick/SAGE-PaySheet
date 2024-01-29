import { createContext } from "react";

interface IAdminUser {
  isUserAdmin: boolean;
  setIsUserAdmin: (_val: boolean) => void;
}

const AdminUser = createContext<IAdminUser>({
  isUserAdmin: false,
  setIsUserAdmin: (_val: boolean) => {},
});
export default AdminUser;
