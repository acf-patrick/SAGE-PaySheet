import { useEffect, useState } from "react";
import { FiCheck, FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { StyledHeader } from "./Paysheets";

function ModifyUser() {
  const { id } = useParams();

  const [user, setUser] = useState<Map<string, string>>(
    new Map<string, string>([
      ["Name", ""],
      ["Lastname", ""],
      ["Username", ""],
      ["Role", ""],
    ])
  );

  const [modify, setModify] = useState(false);
  const labels: string[] = ["Name", "Lastname", "Username", "Role"];

  useEffect(() => {
    api.get("user/" + id).then((res) => {
      setUser(
        new Map<string, string>([
          ["Name", res.data.name],
          ["Lastname", res.data.lastName],
          ["Username", res.data.username],
          ["Role", res.data.role],
        ])
      );
    });
  }, []);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>{user.get(labels[0]) + " " + user.get(labels[1])}</span>
        <div style={{ width: "2rem" }}></div>
      </StyledHeader>
      <form>
        <div className="user-info">
          {Array.from([0, 1, 2, 3]).map((i) =>
            !modify ? (
              <div key={labels[i]}>
                <div>
                  <h3>{labels[i]}:</h3>
                  <p>{user.get(labels[i])}</p>
                </div>
                <FiEdit3 onClick={() => setModify(true)} />
              </div>
            ) : (
              <div key={labels[i]}>
                <input type="text" value={user.get(labels[i])} />
                <FiCheck onClick={() => setModify(false)} />
              </div>
            )
          )}
        </div>
      </form>
    </>
  );
}

export default ModifyUser;
