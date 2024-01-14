import { useEffect, useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import { User } from "../types";
import { StyledHeader } from "./Paysheets";

const Users = styled.div`
  margin-top: 2rem;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  gap: 2rem;
  .list-label {
    display: flex;
    justify-content: space-between;
    width: 62%;
    p {
      color: grey;
    }
  }
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
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
const UserList = styled.div`
  display: flex;
  flex-direction: row;
  width: 65%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  transition: box-shadow 250ms;

  p {
    margin: 1rem;
  }

  &:hover {
    box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.05);
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
      <Users
        style={{
          flexDirection: list ? "column" : "row",
          alignItems: list ? "center" : "none",
          justifyContent: list ? "none" : "center",
        }}
      >
        {list ? (
          <div className="list-label">
            <p>Full Name</p>
            <p>Username</p>
            <p>Role</p>
          </div>
        ) : null}
        {users.map((user, i) =>
          list ? (
            <UserList
              key={user.username}
              onClick={() =>
                navigate({
                  pathname: "/user/" + users[i].id,
                })
              }
            >
              <p>{user.name + " " + user.lastName}</p>
              <p>{user.username}</p>
              <p>{user.role}</p>
            </UserList>
          ) : (
            <UserCard
              key={user.username}
              onClick={() =>
                navigate({
                  pathname: "/user/" + users[i].id,
                })
              }
            >
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
          )
        )}
      </Users>
    </>
  );
}

export default Alluser;
