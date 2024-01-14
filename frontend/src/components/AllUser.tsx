import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import { UpdateUserDto, User } from "../types";
import { FiList, FiGrid } from "react-icons/fi";
import { StyledHeader } from "./Paysheets";

const UserList = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  gap: 2rem;
`;
const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  height: 20rem;
  border: 2px solid grey;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 15px 1px grey;
  transform: scale(1);
  transition: transform 300ms;
  &:hover {
    transform: scale(1.05);
  }
`;
const UserProfil = styled.div`
  width: 100%;
  height: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid grey;
  background-color: grey;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  justify-content: space-around;
  p {
    display: flex;
    flex-direction: column;
    margin: 0;
    span {
      margin: 0;
      color: #5b5b5b;
      font-weight: bold;
    }
  }
`;

function Alluser() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [list, setList] = useState(false);
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
    navigate("user");
  };

  useEffect(() => {
    api.get("user").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>All Users</span>
        <div className="view">
          <FiList onClick={() => setList(true)} />
          <FiGrid onClick={() => setList(false)} />
        </div>
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
