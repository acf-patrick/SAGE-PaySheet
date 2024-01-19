import { useEffect, useRef, useState } from "react";
import { FiDelete, FiFolderPlus } from "react-icons/fi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import "../styles/keyframes.css";
import { Paysheet } from "../types";
import { ConfirmButton } from "./AllUser";
import { StyledHeader } from "./Paysheets";
import UserInfoSummary from "./UserInfoSummary";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

  .labels {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    color: #8f8f8f;

    p {
      width: 15rem;
      margin: 0;
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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  .container {
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 15px;
    width: 27rem;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .date-input {
      width: 25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      label {
        font-size: large;
        font-weight: bold;
        width: 45%;
        margin-top: 0.8rem;
      }
      .date {
        display: flex;
        justify-content: flex-start;
        gap: 1rem;
        width: 50%;
        input {
          margin-top: 0.8rem;
          border: none;
          width: 2rem;
          height: 2rem;
          background-color: transparent;
          border-bottom: 2px solid grey;
          outline: none;
          font-size: medium;

          &:nth-child(1) {
            font-size: small;
            width: 3rem;
          }
          &:nth-child(2) {
            font-size: small;
            width: 3rem;
          }
          &:nth-child(3) {
            font-size: small;
            width: 4rem;
          }
        }
      }
    }

    .add-input {
      width: 25rem;
      display: flex;
      justify-content: space-between;
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
        background-color: transparent;
        border-bottom: 2px solid grey;
        outline: none;
        font-size: medium;
      }
    }
    .validate {
      width: 25rem;
      margin-top: 2rem;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
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
        transition: background-color 200ms;
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
        transition: background-color 200ms;
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
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddingPaysheet, setIsAddingPaysheet] = useState(false);
  const [userIndexToDelet, setUserIndexToDelet] = useState(0);
  const errorRefForPS = useRef<HTMLParagraphElement>(null);
  const [errorForPS, setErrorForPS] = useState("");
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
  });

  const [userDate, setUserDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const [userPaysheets, setUserPaysheets] = useState<Paysheet>({
    id: "",
    userId: id!,
    baseSalary: 0,
    advanceOnSalary: 0,
    date: `${new Date().toLocaleDateString()}`,
  });

  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);

  const addPaysheet = () => {
    let paysheetDate: string =
      userDate.month.toString() +
      "/" +
      userDate.day.toString() +
      "/" +
      userDate.year.toString();

    //Parsing inputs to Paysheet data type
    let data = {
      userId: userPaysheets.userId,
      baseSalary: userPaysheets.baseSalary,
      advanceOnSalary: userPaysheets.advanceOnSalary,
      date: new Date(paysheetDate).toISOString(),
    };
    const { baseSalary, advanceOnSalary, date } = data;

    if (baseSalary < 0) {
      setErrorForPS("Salaire de base invalide ");
      errorRefForPS.current?.classList.add("show");
      setTimeout(() => errorRefForPS.current?.classList.remove("show"), 2000);
      return;
    }

    if (advanceOnSalary < 0) {
      setErrorForPS("Avance invalide");
      errorRefForPS.current?.classList.add("show");
      setTimeout(() => errorRefForPS.current?.classList.remove("show"), 2000);
      return;
    }

    if (!date) {
      setErrorForPS("Date invalide");
      errorRefForPS.current?.classList.add("show");
      setTimeout(() => errorRefForPS.current?.classList.remove("show"), 2000);
      return;
    }

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
        setIsAddingPaysheet(false);
      })
      .catch((err) => {
        console.log("error:" + err);
      });
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
    setUserPaysheets({
      id: "",
      userId: id!,
      baseSalary: 0,
      advanceOnSalary: 0,
      date: `${new Date().toLocaleDateString()}`,
    });
  }, [paysheets]);

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
        res.data.role == "ADMIN" ? setIsAdmin(true) : setIsAdmin(false);
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
        <UserInfoSummary
          id={id!}
          user={user}
          setUser={setUser}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />
        <PaysheetList>
          <h2>
            Fiches de paie{" "}
            {paysheets.length == 0 ? null : (
              <FiFolderPlus onClick={() => setIsAddingPaysheet(true)} />
            )}
          </h2>
          {paysheets.length != 0 ? (
            <div className="labels">
              <p>Salaire de base:</p>
              <p>Avance prise:</p>
              <p>Date:</p>
            </div>
          ) : null}
          {paysheets.length != 0 ? (
            paysheets.map((paysheet, i) => (
              <li key={i}>
                <p>{paysheet.baseSalary}</p>
                <p>{paysheet.advanceOnSalary}</p>
                <p>{new Date(paysheet.date).toLocaleDateString()}</p>
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
                    min={0}
                    placeholder="0"
                    onChange={(e) =>
                      setUserPaysheets({
                        ...userPaysheets,
                        baseSalary: parseFloat(e.currentTarget.value),
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
                    min={0}
                    placeholder="0"
                    onChange={(e) =>
                      setUserPaysheets({
                        ...userPaysheets,
                        advanceOnSalary: parseFloat(e.currentTarget.value),
                      })
                    }
                  />
                </div>
                <div className="date-input">
                  <label>Date:</label>
                  <div className="date">
                    <input
                      type="number"
                      placeholder="JJ"
                      id="day"
                      onChange={(e) => {
                        const value = parseInt(e.currentTarget.value);
                        const month = document.querySelector(
                          "#month"
                        ) as HTMLInputElement;
                        const year = document.querySelector(
                          "#year"
                        ) as HTMLInputElement;
                        const yearValue =
                          year!.value == ""
                            ? new Date().getFullYear()
                            : parseInt(year!.value);
                        const monthValue =
                          month!.value == ""
                            ? new Date().getMonth()
                            : parseInt(month!.value);

                        const lastDayOfMonth = new Date(
                          yearValue,
                          monthValue,
                          0
                        ).getDate();

                        if (value > lastDayOfMonth || value < 0)
                          e.currentTarget.value = lastDayOfMonth.toString();

                        setUserDate({
                          ...userDate,
                          day: value,
                        });
                      }}
                    />
                    <input
                      type="number"
                      id="month"
                      placeholder="MM"
                      onChange={(e) => {
                        const value = parseInt(e.currentTarget.value);
                        if (value > 12 || value < 1) {
                          // ERROR HANDKING IN STYLES
                          const now = new Date().getMonth();
                          e.currentTarget.value = (now + 1).toString();
                          return;
                        }
                        setUserDate({
                          ...userDate,
                          month: value,
                        });
                      }}
                    />
                    <input
                      type="number"
                      id="year"
                      placeholder="AAAA"
                      onChange={(e) => {
                        const value = parseInt(e.currentTarget.value);
                        if (value < 0)
                          e.currentTarget.value = new Date()
                            .getFullYear()
                            .toString();
                        setUserDate({
                          ...userDate,
                          year: parseInt(e.currentTarget.value),
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="validate">
                  <p
                    className="ok"
                    onClick={() => {
                      addPaysheet();
                    }}
                  >
                    Valider
                  </p>
                  <p className="error" ref={errorRefForPS}>
                    <span>{errorForPS}</span>
                  </p>
                  <p
                    className="non"
                    onClick={() => {
                      setIsAddingPaysheet(false);
                    }}
                  >
                    Annuler
                  </p>
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
