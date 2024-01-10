import { useContext, useEffect, useState } from "react";
import { Paysheet, User } from "../types";
import { UserContext } from "../contexts/userContext";
import { api } from "../api";

function Paysheets() {
  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      console.log(user);
      api.get("paysheet").then((res) => {
        const allPaysheets: Paysheet[] = res.data;
        console.log(user.id);
        setPaysheets(
          allPaysheets.filter((paysheet) => paysheet.userId == user.id)
        );
      });
    }
  }, [user]);

  return (
    <div>
      <p>{user?.name}</p>
      <p>{user?.lastName}</p>
      <ul>
        {paysheets.map((paysheet) => (
          <li>{paysheet.baseSalary}</li>
        ))}
      </ul>
    </div>
  );
}

export default Paysheets;
