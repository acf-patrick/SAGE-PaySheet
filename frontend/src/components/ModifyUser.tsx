import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FiDelete, FiEdit3, FiFolderPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import "../styles/keyframes.css";
import { Paysheet } from "../types";
import { StyledHeader } from "./Paysheets";
import { ConfirmButton } from "./AllUser";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
    height: 40px;
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

const PaysheetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
  min-height: 100%;
  padding: 2rem 0;
  gap: 15px;
  border-radius: 15px;
  background-color: #efefef48;

  h2 {
    margin: 0;
    display: flex;
    justify-content: space-between;
    width: 95%;
    svg {
      cursor: pointer;
      color: black;
      transition: color 200ms;
      &:hover {
        color: gray;
      }
    }
  }

  li {
    width: 90%;
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.05);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    cursor: pointer;
    transition: box-shadow 250ms;
    animation: fadeIn linear 250ms;
    padding: 0 1rem;

    &:hover {
      box-shadow: 2px 5px 5px 2px rgba(0, 0, 0, 0.1);
    }
    p {
      width: 20rem;
    }
    div {
      width: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
      color: black;
      transition: color 200ms;
      &:hover {
        color: #8f8f8f;
      }
    }
  }
  .empty-box {
    width: 100%;
    height: auto;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    p {
      color: gray;
      font-size: large;
      font-weight: bold;
    }

    .add-paysheet {
      font-size: xx-large;
      cursor: pointer;
      width: 3rem;
      height: 3rem;
      color: black;
      transition: color 200ms;
      &:hover {
        color: gray;
      }
    }
  }

  h1 {
    text-align: center;
    font-weight: 700;
  }
`;

const StyledAddPaysheet = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  .container {
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 15px;
    width: 35%;
    background-color: #f1f1f1;
    .add-input {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      label {
        font-size: large;
        font-weight: bold;
        width: 45%;
        margin-top: 0.8rem;
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
    .validate {
      width: 90%;
      margin-top: 2rem;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      .ok {
        background-color: green;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 7.3rem;
        height: 3rem;
        border-radius: 5px;
        color: white;
        font-weight: lighter;
        font-size: medium;
        cursor: pointer;
        &:hover {
          background-color: #004900;
        }
      }
      .non {
        background-color: ${({ theme }) => theme.modifyUser.editButton.back};
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5rem;
        height: 3rem;
        border-radius: 5px;
        color: black;
        font-weight: lighter;
        font-size: medium;
        cursor: pointer;
        &:hover {
          background-color: ${({ theme }) =>
            theme.modifyUser.editButton.backhover};
        }
      }
    }
  }
`;

function ModifyUser() {
  const { id } = useParams();
  const [pending, setPending] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isAddingPaysheet, setIsAddingPaysheet] = useState(false);
  const [userIndexToDelet, setUserIndexToDelet] = useState(0);

  const navigate = useNavigate();
  const now = new Date();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });
  const [userPaysheets, setUserPaysheets] = useState<Paysheet>({
    id: "",
    userId: id!,
    baseSalary: "",
    advanceOnSalary: "",
    date: "",
  });

  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const data = {
      id,
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

  const handleSlide = () => {
    setIsAdmin(!isAdmin);
  };

  const addPaysheet = () => {
    const data = {
      userId: userPaysheets.userId,
      baseSalary: parseFloat(userPaysheets.baseSalary),
      advanceOnSalary: parseFloat(userPaysheets.advanceOnSalary),
    };
    api
      .post("paysheet", data)
      .then(() => {
        api
          .get("paysheet/" + id)
          .then((res) => {
            setPaysheets(res.data);
          })
          .catch((err) =>
            console.log("Error while getting user's paysheets: " + err)
          );
      })
      .catch((err) => {
        console.log("error:" + err);
      });
    setIsAddingPaysheet(false);
  };

  const deletePaysheet = (i: number) => {
    api
      .delete("paysheet/" + paysheets[i].id)
      .then(() => {
        api
          .get("paysheet/" + id)
          .then((res) => {
            setPaysheets(res.data);
          })
          .catch((err) =>
            console.log("Error while getting user's paysheets: " + err)
          );
        setConfirmDelete(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setUser({
      ...user,
      role: isAdmin ? "ADMIN" : "USER",
    });
  }, [isAdmin]);

  useEffect(() => {
    api
      .get("user/" + id)
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
    api
      .get("paysheet/" + id)
      .then((res) => {
        setPaysheets(res.data);
      })
      .catch((err) =>
        console.log("Error while getting user's paysheets: " + err)
      );
  }, []);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>{user.name + " " + user.lastName}</span>
        <div style={{ width: "2rem" }}></div>
      </StyledHeader>
      <StyledContainer>
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
                  <StyledSlider $isAdmin={isAdmin} onClick={handleSlide}>
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
            <div className="my-buttons">
              <button>
                {pending ? (
                  <CgSpinner className="spinner" />
                ) : (
                  <span>Sauvegarder</span>
                )}
              </button>
              <div
                className="back-button"
                onClick={() => {
                  setIsEdited(false);
                }}
              >
                Retour
              </div>
            </div>
          )}
        </StyledForm>
        <PaysheetList>
          <h2>
            Fiches de paie{" "}
            {paysheets.length == 0 ? null : (
              <FiFolderPlus onClick={() => setIsAddingPaysheet(true)} />
            )}
          </h2>
          {paysheets.length != 0 ? (
            paysheets.map((paysheet, i) => (
              <li key={i}>
                <p>{paysheet.baseSalary}</p>
                <p>{paysheet.advanceOnSalary}</p>
                <p>{paysheet.date}</p>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserIndexToDelet(i);
                    setConfirmDelete(true);
                  }}
                >
                  <FiDelete />
                </div>
              </li>
            ))
          ) : (
            <div className="empty-box">
              <div>
                <p>Vide</p>
                <FiFolderPlus
                  className="add-paysheet"
                  onClick={() => setIsAddingPaysheet(true)}
                />
              </div>
            </div>
          )}
          {isAddingPaysheet ? (
            <StyledAddPaysheet>
              <div className="container">
                <div className="add-input">
                  <label htmlFor="base-salary">Salaire de base:</label>
                  <input
                    type="number"
                    name="base-salary"
                    id="base-salary"
                    onChange={(e) =>
                      setUserPaysheets({
                        ...userPaysheets,
                        baseSalary: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="add-input">
                  <label htmlFor="advance">Avance prise:</label>
                  <input
                    type="number"
                    name="advance"
                    id="advance"
                    onChange={(e) =>
                      setUserPaysheets({
                        ...userPaysheets,
                        advanceOnSalary: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="add-input">
                  <label htmlFor="Date">Date:</label>
                  <input
                    type="text"
                    name="Date"
                    id="Date"
                    defaultValue={now.toLocaleDateString()}
                    onChange={(e) =>
                      setUserPaysheets({
                        ...userPaysheets,
                        date: e.currentTarget.value,
                      })
                    }
                  />
                </div>
                <div className="validate" onClick={addPaysheet}>
                  <p className="ok">Valider</p>
                  <p className="non">Annuler</p>
                </div>
              </div>
            </StyledAddPaysheet>
          ) : null}
        </PaysheetList>
        {confirmDelete ? (
          <ConfirmButton>
            <div className="container">
              {"Etes-vous sûr de vouloir supprimer cette fiche?"}
              <div className="choice">
                <p className="yes" onClick={() => setConfirmDelete(false)}>
                  Non
                </p>
                <p
                  className="no"
                  onClick={() => {
                    deletePaysheet(userIndexToDelet);
                  }}
                >
                  Oui
                </p>
              </div>
            </div>
          </ConfirmButton>
        ) : null}
      </StyledContainer>
    </>
  );
}

export default ModifyUser;
