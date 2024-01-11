import { useEffect, useState } from "react";
import { api } from "../api";
import { Paysheet, User } from "../types";

function Paysheets() {
  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);
  const [user, setUser] = useState<User>({
    id: "",
    lastName: "",
    name: "",
    role: "",
    username: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      api.get("paysheet/" + userId).then((res) => {
        const allUserPaysheets: Paysheet[] = res.data;
        setPaysheets(allUserPaysheets);
      });
      api.get("user/" + userId).then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.lastName}</p>
      <ul>
        {paysheets.map((paysheet, i) => (
          <li key={i}>{paysheet.baseSalary}</li>
        ))}
      </ul>
    </div>
  );
}

export default Paysheets;
