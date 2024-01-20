import { useState } from "react";
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
  paysheets,
  setIsEditingPaysheet,
}: {
  indexToModify: number;
  paysheets: Paysheet[];
  setIsEditingPaysheet: (a: boolean) => void;
}) {
  const [specificPaysheet, setSpecificPaysheet] = useState<UpdatePaysheetDto>({
    id: paysheets[indexToModify].id,
    baseSalary: paysheets[indexToModify].baseSalary,
    advanceOnSalary: paysheets[indexToModify].advanceOnSalary,
    date: paysheets[indexToModify].date,
  });
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
            />
            <input
              type="number"
              id="month"
              placeholder="MM"
              defaultValue={
                new Date(paysheets[indexToModify].date).getMonth() + 1
              }
            />
            <input
              type="number"
              id="year"
              placeholder="AAAA"
              defaultValue={new Date(
                paysheets[indexToModify].date
              ).getFullYear()}
            />
          </div>
        </div>
        <div className="validate">
          <p className="ok">Valider</p>
          <p className="non" onClick={() => setIsEditingPaysheet(false)}>
            Annuler
          </p>
        </div>
      </div>
    </StyledAddPaysheet>
  );
}

export default EditUserPaysheet;
