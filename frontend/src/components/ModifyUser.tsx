import { FiEdit3, FiCheck } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { UpdateUserDto } from "../types";
import { useState } from "react";

function ModifyUser() {
  const user: UpdateUserDto = useOutletContext();
  const userDatas: string[] = [
    user.name,
    user.lastName,
    user.username,
    user.role,
  ];
  const labels: string[] = ["Name: ", "Lastname: ", "Username: ", "Role: "];
  const [modify, setModify] = useState(false);

  return (
    <form>
      <div className="user-info">
        {userDatas.map((data, i) =>
          modify ? (
            <div key={labels[i]}>
              <div>
                <h3>{labels[i]}</h3>
                <p>{data}</p>
              </div>
              <FiEdit3 />
            </div>
          ) : (
            <div key={labels[i]}>
              <input type="text" />
              <FiCheck />
            </div>
          )
        )}
      </div>
    </form>
  );
}

export default ModifyUser;
