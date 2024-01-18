export type User = {
  id: string;
  name: string;
  lastName: string;
  username: string;
  role: string;
};
export type UpdateUserDto = {
  name: string;
  lastName: string;
  username: string;
  role: string;
};

export type UserDto = {
  name: string;
  lastName: string;
  username: string;
};

export type Paysheet = {
  id: string;
  userId: string;
  baseSalary: number;
  advanceOnSalary: number;
  date: string;
};
