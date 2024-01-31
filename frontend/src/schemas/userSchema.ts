import { User } from "../types";

export const UserSchema = [
  {
    column: "Nom",
    type: String,
    value: (user: User) => user.name,
  },
  {
    column: "Prenoms",
    type: String,
    value: (user: User) => user.lastName,
  },
  {
    column: "Identifiant",
    type: String,
    value: (user: User) => user.username,
  },
  {
    column: "Role",
    type: String,
    value: (user: User) => user.role,
  },
];
