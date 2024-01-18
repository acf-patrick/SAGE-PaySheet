import { useEffect, useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import UserEditButtons from "./UserEditButtons";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 3rem;

  .role-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .slider {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  button,
  .edit-button {
    height: 3rem;
    background-color: ${({ theme }) => theme.modifyUser.background};
    width: 120px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 250ms;

    &:hover {
      background-color: ${({ theme }) => theme.modifyUser.hover};
    }
  }

  .my-edit-button {
    display: flex;
    width: 35%;
    flex-direction: row-reverse;
    justify-content: space-between;
    .edit-button {
      background-color: ${({ theme }) =>
        theme.modifyUser.editButton.background};
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: background-color 250ms;

      &:hover {
        background-color: ${({ theme }) => theme.modifyUser.editButton.hover};
      }
    }
    .back-button {
      background-color: ${({ theme }) => theme.modifyUser.editButton.back};
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 250ms;

      &:hover {
        background-color: ${({ theme }) =>
          theme.modifyUser.editButton.backhover};
      }
    }
  }
  .my-buttons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 35%;
    .error {
      opacity: 0;
      background-color: ${({ theme }) => theme.login.error.background};
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: red;
      font-weight: 600;
      transition: opacity 250ms;
    }
    .show {
      opacity: 1;
    }

    button {
      .spinner {
        font-size: 25px;
        animation: rotate linear infinite 750ms;
      }
    }

    .back-button {
      background-color: ${({ theme }) => theme.modifyUser.editButton.back};
      display: flex;
      align-items: center;
      justify-content: center;
      width: 5rem;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 250ms;

      &:hover {
        background-color: ${({ theme }) =>
          theme.modifyUser.editButton.backhover};
      }
    }
  }
`;
const UserInfo = styled.div`
  width: 35%;
  .infos {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      h3 {
        width: 50%;
      }
      p {
        width: auto;
      }
      label {
        margin-top: 0.8rem;
        width: 50%;
        font-size: large;
        font-weight: bold;
      }
      input {
        margin-top: 0.8rem;
        border: none;
        width: auto;
        height: 2rem;
        border-bottom: 2px solid grey;
        outline: none;
        font-size: medium;
      }
    }
  }
`;

const StyledSlider = styled.div<{ $isAdmin: boolean }>`
  background-color: ${(props) => (props.$isAdmin ? "green" : "grey")};
  border-radius: 16px;
  width: 2rem;
  height: 1rem;
  padding: 1px;
  cursor: pointer;

  .slider-circle {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #f1f1f1;
    transform: ${(props) =>
      props.$isAdmin ? "translateX(0)" : "translateX(100%)"};
    transition: transform 250ms, background-color 250ms;
  }
`;

interface userI {
  name: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
}
function UserInfoSummary({
  userId,
  user,
  setUser,
}: {
  userId: string;
  user: userI;
  setUser: (e: userI) => void;
}) {
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [error, setError] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [pending, setPending] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, lastName, username, password } = user;

    setPending(true);

    if (name == "") {
      setError("Nom vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (lastName == "") {
      setError("Prénom(s) vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (username == "") {
      setError("Identifiant vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (password == "") {
      setError("Mot de passe vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit avoir au moins 8 caractères");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    const data = {
      userId,
      ...user,
      password: user.password,
    };
    api
      .patch("user", data)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPending(false));
  };

  useEffect(() => {
    setUser({
      ...user,
      role: isAdmin ? "ADMIN" : "USER",
    });
  }, [isAdmin]);

  useEffect(() => {
    api
      .get("user/" + userId)
      .then((res) => {
        setUser({
          name: res.data.name,
          lastName: res.data.lastName,
          username: res.data.username,
          password: "********",
          role: res.data.role,
        });
        setIsAdmin(res.data.role == "ADMIN");
      })
      .catch((err) => console.log("Error while getting user: " + err));
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit}>
      <UserInfo>
        {!isEdited ? (
          <div className="infos">
            <div>
              <h3>Nom: </h3>
              <p>{" " + user.name}</p>
            </div>
            <div>
              <h3>Prénom(s): </h3>
              <p>{" " + user.lastName}</p>
            </div>
            <div>
              <h3>Identifiant: </h3>
              <p>{" " + user.username}</p>
            </div>
          </div>
        ) : (
          <div className="infos">
            <div>
              <label htmlFor="name">Nom: </label>
              <input
                type="text"
                defaultValue={user.name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.currentTarget.value,
                  })
                }
                id="name"
                name="name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Prénom(s): </label>
              <input
                type="text"
                defaultValue={user.lastName}
                onChange={(e) =>
                  setUser({
                    ...user,
                    lastName: e.currentTarget.value,
                  })
                }
                id="lastName"
                name="lastName"
              />
            </div>
            <div>
              <label htmlFor="username">Identifiant: </label>
              <input
                type="text"
                defaultValue={user.username}
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.currentTarget.value,
                  })
                }
                id="username"
                name="username"
              />
            </div>
            <div>
              <label htmlFor="password">Mot de passe: </label>
              <input
                type="text"
                defaultValue="********"
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.currentTarget.value,
                  })
                }
                id="password"
                name="password"
              />
            </div>
          </div>
        )}
        {isEdited ? (
          <div className="role-container">
            <h3>Role:</h3>
            <div className="slider">
              Admin
              <StyledSlider
                $isAdmin={isAdmin}
                onClick={() => setIsAdmin(!isAdmin)}
              >
                <div className="slider-circle"></div>
              </StyledSlider>
              User
            </div>
          </div>
        ) : null}
      </UserInfo>
      {!isEdited ? (
        <div className="my-edit-button">
          <div className="edit-button" onClick={() => setIsEdited(true)}>
            <FiEdit3 />
            <span>Modifier</span>
          </div>
          <div
            className="back-button"
            onClick={() => {
              navigate({
                pathname: "/alluser",
              });
            }}
          >
            Retour
          </div>
        </div>
      ) : (
        <UserEditButtons
          pending={pending}
          callBack={() => setIsEdited(false)}
          error={error}
          errorRef={errorRef}
        />
      )}
    </StyledForm>
  );
}

export default UserInfoSummary;
