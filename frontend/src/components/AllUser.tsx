import { useEffect, useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import { User } from "../types";
import { StyledHeader } from "./Paysheets";

const Users = styled.div`
  margin: 2rem 0;
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  gap: 2rem;
  .list-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    .titles {
      width: 80%;
      padding-right: 8rem;
      display: flex;
      justify-content: space-between;
      p {
        color: grey;
      }
    }
    label {
      display: flex;
      justify-content: flex-start;
      gap: 1rem;
      width: 7.5rem;
      select {
        width: 3rem;
        background-color: white;
        cursor: pointer;
      }
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
  animation: fadeIn linear 250ms;
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
  animation: fadeIn linear 250ms;

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
  const [list, setList] = useState(true);
  const [sort, setSort] = useState(" ");

  useEffect(() => {
    api.get("user").then((res) => {
      const tmp: User[] = res.data;
      setUsers([...tmp.sort((a, b) => a.name.localeCompare(b.name))]);
    });
  }, []);

  useEffect(() => {
    if (sort == "") {
      setSort("A-Z");
    }
  }, [users]);

  useEffect(() => {
    if (sort == "A-Z") {
      setUsers([...users.sort((a, b) => a.name.localeCompare(b.name))]);
    } else if (sort == "Z-A") {
      setUsers([
        ...users.sort((a, b) => a.name.localeCompare(b.name)).reverse(),
      ]);
    } else if (sort == "Admin") {
      setUsers([...users.sort((a, b) => a.role.localeCompare(b.role))]);
    } else {
      setUsers([
        ...users.sort((a, b) => a.role.localeCompare(b.role)).reverse(),
      ]);
    }
    console.log(sort);
  }, [sort]);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>All Users</span>
        <div className="view">
          {!list ? (
            <FiList onClick={() => setList(true)} className="icone" />
          ) : (
            <FiGrid onClick={() => setList(false)} className="icone" />
          )}
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
            <label htmlFor="select">
              Trier:
              <select
                id="select"
                name="Trier"
                onChange={(e) => setSort(e.currentTarget.value)}
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </label>
            <div className="titles">
              <p>Full Name</p>
              <p>Username</p>
              <p>Role</p>
            </div>
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
