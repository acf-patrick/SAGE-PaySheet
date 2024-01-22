import { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../api";
import { Paysheet, User } from "../types";
import { StyledHeader } from "./AllUser";
import UserPaysheetList from "./UserPaysheetList";

const StyledPaysheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Paysheets() {
  const [user, setUser] = useState<User>({
    id: "",
    lastName: "",
    name: "",
    role: "",
    username: "",
  });
  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    api
      .get("user/" + userId)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
    api
      .get("paysheet/" + userId)
      .then((res) => setPaysheets(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>{user.name + " " + user.lastName}</span>
        <div style={{ width: "2rem" }}></div>
      </StyledHeader>
      <StyledPaysheetContainer>
        <UserPaysheetList
          paysheets={paysheets}
          setPaysheets={setPaysheets}
          userId={localStorage.getItem("userId")!}
        />
        ;
      </StyledPaysheetContainer>
    </>
  );
}

export default Paysheets;
