import { Paysheet } from "../types";

export const PaysheetSchema = [
  {
    column: "Salaire de base (Ar)",
    type: Number,
    value: (paysheet: Paysheet) => paysheet.baseSalary,
    align: "center",
    alignVertical: "center",
    backgroundColor: "#00ff00",
    borderStyle: "thick",
    width: "25",
  },
  {
    column: "Avance sur salaire (Ar)",
    type: Number,
    value: (paysheet: Paysheet) => paysheet.advanceOnSalary,
    align: "center",
    alignVertical: "center",
    backgroundColor: "#00ff00",
    borderStyle: "thick",
    width: "25",
  },
  {
    column: "Salaire restant (Ar)",
    type: Number,
    value: (paysheet: Paysheet) =>
      paysheet.baseSalary - paysheet.advanceOnSalary,
    align: "center",
    alignVertical: "center",
    backgroundColor: "#00ff00",
    borderStyle: "thick",
    width: "25",
  },
  {
    column: "Date",
    type: Date,
    format: "dd/mm/yyyy",
    value: (paysheet: Paysheet) => new Date(paysheet.date),
    align: "center",
    alignVertical: "center",
    backgroundColor: "#00ff00",
    borderStyle: "thick",
    width: "25",
  },
];
