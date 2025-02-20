import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../api";
import { User } from "../types";
import ConfirmPopUp from "./ConfirmPopUp";
import Sidebar from "./Sidebar";
import UsersList from "./UsersList";
import { UserSchema } from "../schemas/userSchema";

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

  @media (width <= 480px) {
    width: calc(100% - 2rem);
    min-height: 56px;
    font-size: medium;
    padding: 0 1rem;
  }

  @media (480px <= width <= 768px) {
    width: calc(97.9% - 3rem);
    min-height: 56px;
    font-size: medium;
    padding: 0 2rem;
  }

  @media (768px <= width <= 1024px) {
    width: calc(98.4% - 3rem);
    min-height: 56px;
    font-size: medium;
    padding: 0 2rem;
  }

  .image {
    width: 30%;
    display: flex;
    justify-content: flex-start;

    img {
      margin-left: 50px;
      width: 50px;

      @media (width <= 480px) {
        width: 35px;
        margin: 0;
      }

      @media (480px <=width <= 768px) {
        width: 35px;
        margin: 0;
      }

      @media (768px <= width <= 1024px) {
        width: 35px;
        margin: 0;
      }
    }
  }

  & > span {
    width: 30%;

    @media (width <= 480px) {
      height: 75%;
      width: 50%;
      justify-content: center;
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

function Alluser() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userIndexToDelet, setUserIndexToDelet] = useState(0);
  const [sort, setSort] = useState("A-Z");
  const [toggleButtons, setToggleButtons] = useState(false);

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
    const value = users.filter((_user, index) => i != index);
    console.log(value);
    setUsers(value);
  };

  useEffect(() => {
    api.get("user").then((res) => {
      const tmp: User[] = res.data;
      setUsers([...tmp.sort((a, b) => a.name.localeCompare(b.name))]);
      setFilteredUsers([...tmp.sort((a, b) => a.name.localeCompare(b.name))]);
    });
  }, []);

  useEffect(() => {
    console.log("Sort: " + sort);
    if (sort != "") {
      if (sort == "A-Z") {
        setFilteredUsers([
          ...users.sort((a, b) => a.name.localeCompare(b.name)),
        ]);
      } else if (sort == "IdA-IdZ") {
        setFilteredUsers([
          ...users.sort((a, b) => a.username.localeCompare(b.name)),
        ]);
      } else if (sort == "Z-A") {
        setFilteredUsers([
          ...users.sort((a, b) => a.name.localeCompare(b.name)).reverse(),
        ]);
      } else if (sort == "IdZ-IdA") {
        setFilteredUsers([
          ...users.sort((a, b) => a.username.localeCompare(b.name)).reverse(),
        ]);
      } else if (sort == "Admin") {
        setFilteredUsers([
          ...users.filter((user) => user.role == "ADMIN"),
          ...users.filter((user) => user.role != "ADMIN"),
        ]);
      } else if (sort == "User") {
        setFilteredUsers([
          ...users.filter((user) => user.role == "USER"),
          ...users.filter((user) => user.role != "USER"),
        ]);
      }
    }
  }, [sort]);

  return (
    <>
      <StyledHeader>
        <div className="image">
          <img
            src="../../public/paysheet.svg"
            alt="logo"
            onClick={() => setToggleButtons((toggleButtons) => !toggleButtons)}
          />
        </div>
        <span>Tous les utilisateurs</span>
        <div style={{ width: "30%" }}></div>
        <Sidebar
          schema={UserSchema}
          data={filteredUsers}
          toggle={toggleButtons}
          setToggle={setToggleButtons}
          fileName={"liste_utilisateurs.xlsx"}
        />
      </StyledHeader>
      <UsersList
        users={filteredUsers}
        sort={sort}
        setSort={setSort}
        setConfirmDelete={(i: number, e: React.MouseEvent<SVGElement>) => {
          setUserIndexToDelet(i);
          e.stopPropagation();
          setConfirmDelete(true);
        }}
      />
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
