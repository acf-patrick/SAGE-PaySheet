import { Outlet, useNavigate } from "react-router-dom";
import { StyledHeader } from "./Paysheets";

function User() {
  const navigate = useNavigate();
  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>User Infos</span>
        <button onClick={() => navigate("alluser")}>All Users</button>
      </StyledHeader>
      <Outlet />
    </>
  );
}

export default User;
