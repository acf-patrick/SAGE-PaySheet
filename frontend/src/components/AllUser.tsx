import { Outlet, useNavigate } from "react-router-dom";
import { StyledHeader } from "./Paysheets";
import { api } from "../api";
import { UpdateUserDto } from "../types";

function Alluser() {
  const navigate = useNavigate();
  let user: UpdateUserDto[] = [];
  api.get("alluser/").then((res) => {
    user.push({
      name: res.data.name,
      lastName: res.data.lastName,
      username: res.data.username,
      role: res.data.role,
    });
  });

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>User Infos</span>
      </StyledHeader>
      <Outlet />
    </>
  );
}

export default Alluser;
