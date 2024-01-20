import React, { useRef, useState } from "react";
import styled from "styled-components";
import { api } from "../api";
import { Paysheet } from "../types";

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
function AddingPaysheet({
  setPaysheets,
  userPaysheets,
  setUserPaysheets,
  setIsAddingPaysheet,
  userId,
}: {
  userId: string;
  userPaysheets: Paysheet;
  setPaysheets: (a: Paysheet[]) => void;
  setUserPaysheets: (a: Paysheet) => void;
  setIsAddingPaysheet: (a: boolean) => void;
}) {
  const errorRefForPS = useRef<HTMLParagraphElement>(null);
  const [errorForPS, setErrorForPS] = useState("");
  const [userDate, setUserDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });

  const handleDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    const month = document.querySelector("#month") as HTMLInputElement;
    const year = document.querySelector("#year") as HTMLInputElement;
    const yearValue =
      year!.value == "" ? new Date().getFullYear() : parseInt(year!.value);
    const monthValue =
      month!.value == "" ? new Date().getMonth() : parseInt(month!.value);

    const lastDayOfMonth = new Date(yearValue, monthValue, 0).getDate();

    if (value > lastDayOfMonth || value < 0)
      e.currentTarget.value = lastDayOfMonth.toString();

    setUserDate({
      ...userDate,
      day: value > lastDayOfMonth || value < 0 ? lastDayOfMonth : value,
    });
  };

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
          .get("paysheet/" + userId)
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

  const reComputeDay = (month: number, year: number) => {
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    const day = document.querySelector("#day") as HTMLInputElement;
    day.value = lastDayOfMonth.toString();
  };

  const handleMonth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    if (value > 12 || value < 1) {
      const now = new Date().getMonth();
      e.currentTarget.value = (now + 1).toString();
      return;
    }
    reComputeDay(
      value,
      userDate.year == 0 ? new Date().getFullYear() : userDate.year
    );
    setUserDate({
      ...userDate,
      month: value,
    });
  };

  const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    if (value < 0) e.currentTarget.value = new Date().getFullYear().toString();
    reComputeDay(
      userDate.month == 0 ? new Date().getMonth() : userDate.month,
      value
    );
    setUserDate({
      ...userDate,
      year: parseInt(e.currentTarget.value),
    });
  };

  return (
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
                handleDateInput(e);
              }}
            />
            <input
              type="number"
              id="month"
              placeholder="MM"
              onChange={handleMonth}
            />
            <input
              type="number"
              id="year"
              placeholder="AAAA"
              onChange={handleYear}
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
  );
}

export default AddingPaysheet;
