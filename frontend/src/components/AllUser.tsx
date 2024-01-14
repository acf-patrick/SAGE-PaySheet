import { Outlet, useNavigate } from "react-router-dom";
import { StyledHeader } from "./Paysheets";
import { api } from "../api";
import { UpdateUserDto } from "../types";
import styled from "styled-components";
import { useState } from "react";

const UserList = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  gap: 2rem;
`;
const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 28%;
  height: 20%;
  border: 2px solid gray;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 0 15px 15px grey;
  transform: scale(0);
  transition: transform 300ms;
  &:hover {
    transform: scale(0.2);
  }
`;
const UserProfil = styled.div`
  width: 100%;
  height: 45%;
  border-bottom: 1px solid grey;
  background-color: grey;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  justify-content: space-between;
  p {
    display: flex;
    flex-direction: column;
    span {
      color: #5b5b5b;
    }
  }
`;

function Alluser() {
  let users: UpdateUserDto[] = [];
  api.get("alluser/").then((res) => {
    users.push({
      name: res.data.name,
      lastName: res.data.lastName,
      username: res.data.username,
      role: res.data.role,
    });
  });
  const [selectedUser, setSelectedUser] = useState<UpdateUserDto>({
    name: "",
    lastName: "",
    username: "",
    role: "",
  });
  const handleSelectedUser = (i: number) => {
    setSelectedUser({
      name: users[i].name,
      lastName: users[i].lastName,
      username: users[i].username,
      role: users[i].role,
    });
  };

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>All Users</span>
      </StyledHeader>
      <UserList>
        {users.map((user, i) => (
          <UserCard key={user.username} onClick={() => handleSelectedUser(i)}>
            <UserProfil>Placeholder Image</UserProfil>
            <UserInfo>
              <p>
                <span>Full name:</span>
                {user.name + " " + user.lastName}
              </p>
              <p>
                <span>UserName:</span>
                {user.username}
              </p>
              <p>
                <span>Role:</span>
                {user.role}
              </p>
            </UserInfo>
          </UserCard>
        ))}
      </UserList>
      <Outlet context={[selectedUser]} />
    </>
  );
}

export default Alluser;
