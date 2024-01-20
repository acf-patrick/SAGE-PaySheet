import { useEffect, useState } from "react";
import { FiGrid, FiList, FiDelete } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import { User } from "../types";
import ConfirmPopUp from "./ConfirmPopUp";

export const StyledHeader = styled.h2<{ $scrolled?: boolean }>`
  margin: 0;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  backdrop-filter: blur(1px);
  min-height: 75px;
  text-align: center;
  background-color: grey;
  box-shadow: ${(props) =>
    props.$scrolled ? "0 0 5px 5px #8080809a" : "none"};
  transition: border-bottom 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    margin-left: 50px;
    width: 50px;
  }

  svg {
    margin-right: 50px;
    font-size: 35px;
    cursor: pointer;
    animation: fadeIn linear 350ms;
  }
`;

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
    width: 100%;
    .titles {
      width: 75%;
      padding-right: 20%;
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
      width: 30%;
      display: flex;
      justify-content: center;
      select {
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
  transform: scale(1);
  transition: transform 300ms;
  animation: fadeIn linear 250ms;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  .delete {
    font-size: x-large;
    width: 100%;
    height: 3rem;
    margin: 0 13% 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #f1f1f1;
    color: gray;
    transition: color 200ms, background-color 200ms;
    &:hover {
      color: white;
      background-color: #fcdfdf;
    }
  }
`;
const UserList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 5px;
  justify-content: flex-end;
  cursor: pointer;
  animation: fadeIn linear 250ms;

  .first-child {
    width: 60%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: box-shadow 250ms;
    &:hover {
      box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
    }
    p {
      margin: 1rem;
    }
  }

  .delete {
    font-size: x-large;
    width: 5%;
    margin: 0 13% 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: #f1f1f1;
    color: gray;
    transition: color 200ms, background-color 200ms;
    &:hover {
      color: white;
      background-color: #fcdfdf;
    }
  }
`;

export const ConfirmButton = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);

  .container {
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    font-size: medium;
    text-align: center;
    width: 25%;
    height: 10rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid grey;
    background-color: #fafafa;
    z-index: 2;
    .choice {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      .yes,
      .no {
        border: 1px solid gray;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        height: 2rem;
        font-size: medium;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          color: #000;
          background-color: #e3e3e3;
        }
      }
    }
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
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [list, setList] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userIndexToDelet, setUserIndexToDelet] = useState(0);
  const [sort, setSort] = useState("");

  const deleteUser = (i: number) => {
    api
      .delete("user/" + users[i].id)
      .then((_res) => {
        api.get("user").then((res) => {
          const tmp: User[] = res.data;
          setUsers([...tmp.sort((a, b) => a.name.localeCompare(b.name))]);
        });
        setConfirmDelete(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api.get("user").then((res) => {
      const tmp: User[] = res.data;
      setUsers([...tmp.sort((a, b) => a.name.localeCompare(b.name))]);
      setFilteredUsers([...tmp.sort((a, b) => a.name.localeCompare(b.name))]);
    });
  }, []);

  useEffect(() => {
    if (sort != "") {
      if (sort == "A-Z") {
        setFilteredUsers([
          ...users.sort((a, b) => a.name.localeCompare(b.name)),
        ]);
      } else if (sort == "Z-A") {
        setFilteredUsers([
          ...users.sort((a, b) => a.name.localeCompare(b.name)).reverse(),
        ]);
      } else if (sort == "Admin") {
        setFilteredUsers([...users.filter((user) => user.role == "ADMIN")]);
      } else {
        setFilteredUsers([...users.filter((user) => user.role == "USER")]);
      }
    }
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
        {filteredUsers.map((user, i) =>
          list ? (
            <UserList
              key={user.username}
              onClick={() =>
                navigate({
                  pathname: "/user/" + filteredUsers[i].id,
                })
              }
            >
              <div className="first-child">
                <p>{user.name + " " + user.lastName}</p>
                <p>{user.username}</p>
                <p>{user.role}</p>
              </div>
              <div
                className="delete"
                onClick={(e) => {
                  setUserIndexToDelet(i);
                  e.stopPropagation();
                  setConfirmDelete(true);
                }}
              >
                <FiDelete />
              </div>
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
              <div
                className="delete"
                onClick={(e) => {
                  setUserIndexToDelet(i);
                  e.stopPropagation();
                  setConfirmDelete(true);
                }}
              >
                <FiDelete />
              </div>
            </UserCard>
          )
        )}
      </Users>
      {confirmDelete ? (
        <ConfirmPopUp
          callBackStop={() => setConfirmDelete(false)}
          callBackValidate={() => deleteUser(userIndexToDelet)}
        />
      ) : null}
    </>
  );
}

export default Alluser;
