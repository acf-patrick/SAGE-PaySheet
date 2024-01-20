import { useState } from "react";
import { api } from "../api";
import { Paysheet } from "../types";
import { StyledAddPaysheet } from "./AddingPaysheet";

interface UpdatePaysheetDto {
  id: string;
  baseSalary: number;
  advanceOnSalary: number;
  date: string;
}
function EditUserPaysheet({
  indexToModify,
  userId,
  paysheets,
  setPaysheets,
  setIsEditingPaysheet,
}: {
  userId: string;
  setPaysheets: (e: Paysheet[]) => void;
  indexToModify: number;
  paysheets: Paysheet[];
  setIsEditingPaysheet: (a: boolean) => void;
}) {
  const [userDate, setUserDate] = useState({
    day: 0,
    month: 0,
    year: 0,
  });
  const [specificPaysheet, setSpecificPaysheet] = useState<UpdatePaysheetDto>({
    id: paysheets[indexToModify].id,
    baseSalary: paysheets[indexToModify].baseSalary,
    advanceOnSalary: paysheets[indexToModify].advanceOnSalary,
    date: paysheets[indexToModify].date,
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

  const handleValidate = () => {
    api
      .patch("paysheet", specificPaysheet)
      .then(() => {
        api
          .get("paysheet/" + userId)
          .then((res) => {
            setPaysheets(res.data);
          })
          .catch((err) =>
            console.log("Error while getting user's paysheets: " + err)
          );
      })
      .catch((err) => console.log(err));
    setIsEditingPaysheet(false);
  };

  return (
    <StyledAddPaysheet>
      <div className="container">
        <div className="add-input">
          <label htmlFor="base-salary">Montant actuel:</label>
          <input
            type="number"
            name="base-salary"
            id="base-salary"
            min={0}
            defaultValue={paysheets[indexToModify].baseSalary}
            onChange={(e) =>
              setSpecificPaysheet({
                ...specificPaysheet,
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
            defaultValue={paysheets[indexToModify].advanceOnSalary}
            onChange={(e) =>
              setSpecificPaysheet({
                ...specificPaysheet,
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
              defaultValue={new Date(paysheets[indexToModify].date).getDate()}
              onChange={(e) => {
                handleDateInput(e);
              }}
            />
            <input
              type="number"
              id="month"
              placeholder="MM"
              defaultValue={
                new Date(paysheets[indexToModify].date).getMonth() + 1
              }
              onChange={handleMonth}
            />
            <input
              type="number"
              id="year"
              placeholder="AAAA"
              defaultValue={new Date(
                paysheets[indexToModify].date
              ).getFullYear()}
              onChange={handleYear}
            />
          </div>
        </div>
        <div className="validate">
          <p className="ok" onClick={handleValidate}>
            Valider
          </p>
          <p className="non" onClick={() => setIsEditingPaysheet(false)}>
            Annuler
          </p>
        </div>
      </div>
    </StyledAddPaysheet>
  );
}

export default EditUserPaysheet;
