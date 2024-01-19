import { useRef, useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import UserEdit, { UserInfo } from "./UserEdit";
import UserEditButtons from "./UserEditButtons";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 3rem;

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

interface userI {
  name: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
}
function UserInfoSummary({
  id,
  user,
  setUser,
  isAdmin,
  setIsAdmin,
}: {
  id: string;
  user: userI;
  isAdmin: boolean;
  setIsAdmin: (e: boolean) => void;
  setUser: (e: userI) => void;
}) {
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [error, setError] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [pending, setPending] = useState(false);
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
      id,
      ...user,
      password: user.password,
    };
    console.log(data);
    api
      .patch("user", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location.reload();
        setPending(false);
      });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div style={{ width: "35%" }}>
        {!isEdited ? (
          <>
            <UserInfo>
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
            </UserInfo>
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
          </>
        ) : (
          <>
            <UserEdit
              user={user}
              setUser={setUser}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            />
            <UserEditButtons
              pending={pending}
              callBack={() => setIsEdited(false)}
              error={error}
              errorRef={errorRef}
            />
          </>
        )}
      </div>
    </StyledForm>
  );
}

export default UserInfoSummary;
