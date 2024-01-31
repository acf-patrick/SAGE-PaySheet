import { User } from "../types";

export const UserSchema = [
  {
    column: "Nom",
    type: String,
    value: (user: User) => user.name,
    width: "35",
  },
  {
    column: "Prenoms",
    type: String,
    value: (user: User) => user.lastName,
    width: "45",
  },
  {
    column: "Identifiant",
    type: String,
    value: (user: User) => user.username,
    width: "35",
  },
  {
    column: "Role",
    type: String,
    value: (user: User) => user.role,
    width: "15",
  },
];
