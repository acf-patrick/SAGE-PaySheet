import { useState } from "react";
import { Paysheet, User } from "../types";

function Paysheets() {
  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);
  const [user, setUser] = useState<User>({
    name: "",
    lastName: "",
    username: "",
  });

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.lastName}</p>
      <ul>
        {paysheets.map((paysheet) => (
          <li>{paysheet.baseSalary}</li>
        ))}
      </ul>
    </div>
  );
}

export default Paysheets;
