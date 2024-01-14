import { FiEdit3 } from "react-icons/fi";
import { useOutletContext } from "react-router-dom";
import { UpdateUserDto } from "../types";

function ModifyUser() {
  const user: UpdateUserDto = useOutletContext();

  return (
    <form>
      <p>
        {user.name}
        <FiEdit3 />
      </p>
      <p>
        {user.lastName}
        <FiEdit3 />
      </p>
      <p>
        {user.username}
        <FiEdit3 />
      </p>
      <p>
        {user.role}
        <FiEdit3 />
      </p>
    </form>
  );
}

export default ModifyUser;
