import { Paysheet } from "../types";

export const PaysheetSchema = [
  {
    column: "Salaire de base (Ar)",
    type: Number,
    value: (paysheet: Paysheet) => paysheet.baseSalary,
  },
  {
    column: "Avance sur salaire (Ar)",
    type: Number,
    value: (paysheet: Paysheet) => paysheet.advanceOnSalary,
  },
  {
    column: "Salaire restant (Ar)",
    type: Number,
    value: (paysheet: Paysheet) =>
      paysheet.baseSalary - paysheet.advanceOnSalary,
  },
  {
    column: "Date",
    type: Date,
    format: "dd/mm/yyyy",
    value: (paysheet: Paysheet) => new Date(paysheet.date),
  },
];
