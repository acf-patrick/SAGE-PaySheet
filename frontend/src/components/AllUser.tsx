import { useEffect, useState } from "react";
import { FiGrid, FiList, FiDelete } from "react-icons/fi";
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
      box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.05);
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

const ConfirmButton = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  .container {
    font-size: large;
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
  const [list, setList] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userIndexToDelet, setUserIndexToDelet] = useState(0);
  const [sort, setSort] = useState(" ");

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
    });
  }, []);

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
        {confirmDelete ? (
          <ConfirmButton>
            <div className="container">
              Vous êtes sûr?
              <div className="choice">
                <p className="yes" onClick={() => setConfirmDelete(false)}>
                  Non
                </p>
                <p
                  className="no"
                  onClick={() => {
                    deleteUser(userIndexToDelet);
                  }}
                >
                  Oui
                </p>
              </div>
            </div>
          </ConfirmButton>
        ) : null}
      </Users>
    </>
  );
}

export default Alluser;
