import { FiDelete, FiFolderPlus } from "react-icons/fi";
import styled from "styled-components";
import { Paysheet } from "../types";

const StyledPaysheetList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65%;
  min-height: 100%;
  padding: 2rem 0;
  gap: 15px;
  border-radius: 15px;
  background-color: #d7d2d274;

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
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #8f8f8f;
    padding-left: 1rem;

    p {
      width: 10rem;
      margin: 0;

      &:nth-child(5) {
        width: 2.5rem;
        display: grid;
        place-items: center;
      }
    }
  }

  li {
    width: 90%;
    padding-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    background-color: #ffffffda;
    cursor: pointer;
    transition: box-shadow 250ms;
    animation: fadeIn linear 250ms;
    height: 3rem;
    &:hover {
      box-shadow: 2px 5px 5px 2px rgba(0, 0, 0, 0.1);
    }

    p {
      width: 10rem;
      margin: 0;
      height: 100%;
      display: flex;
      align-items: center;

      &:nth-child(5) {
        width: 2.5rem;
        display: grid;
        place-items: center;
        padding-left: 0;
      }
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

function UserPaysheetList({
  paysheets,
  setIsAddingPaysheet,
  setUserIndexToDelet,
  setConfirmDelete,
}: {
  paysheets: Paysheet[];
  setIsAddingPaysheet?: (e: boolean) => void;
  setUserIndexToDelet?: (e: number) => void;
  setConfirmDelete?: (e: boolean) => void;
}) {
  const AddIcon = setIsAddingPaysheet ? (
    <FiFolderPlus
      onClick={() => {
        if (setIsAddingPaysheet) setIsAddingPaysheet(true);
      }}
    />
  ) : null;

  const DeleteIcon = (i: number) =>
    setUserIndexToDelet ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (setUserIndexToDelet && setConfirmDelete) {
            setUserIndexToDelet(i);
            setConfirmDelete(true);
          }
        }}
      >
        <FiDelete />
      </div>
    ) : null;

  return (
    <StyledPaysheetList>
      <h2>Fiches de paie {paysheets.length == 0 ? null : AddIcon}</h2>
      {paysheets.length != 0 ? (
        <div className="labels">
          <p>Salaire de base:</p>
          <p>Avance prise:</p>
          <p>Montant restant:</p>
          <p>Date:</p>
          <p></p>
        </div>
      ) : null}
      {paysheets.length != 0 ? (
        paysheets.map((paysheet, i) => (
          <li key={i}>
            <p>{paysheet.baseSalary.toLocaleString() + "Ar"}</p>
            <p>{paysheet.advanceOnSalary.toLocaleString() + "Ar"}</p>
            <p>
              {(
                paysheet.baseSalary - paysheet.advanceOnSalary
              ).toLocaleString() + "Ar"}
            </p>
            <p>{new Date(paysheet.date).toLocaleDateString()}</p>
            <p>{DeleteIcon(i)}</p>
          </li>
        ))
      ) : (
        <div className="empty-box">
          <div>
            <p>Vide</p>
            <FiFolderPlus
              className="add-paysheet"
              onClick={() => {
                if (setIsAddingPaysheet) {
                  setIsAddingPaysheet(true);
                }
              }}
            />
          </div>
        </div>
      )}
    </StyledPaysheetList>
  );
}

export default UserPaysheetList;
