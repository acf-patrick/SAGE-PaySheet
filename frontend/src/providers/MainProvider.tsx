import { UserProvider } from "./UserProvider";

const MainProvider = ({ children }: { children: any }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default MainProvider;
