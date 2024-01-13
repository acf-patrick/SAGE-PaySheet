import { FiEdit3 } from "react-icons/fi";
import { UpdateUserDto } from "../types";
import { useState } from "react";

function ModifyUser() {
  const [user, setuser] = useState<UpdateUserDto>({
    name: "",
    lastName: "",
    username: "",
    role: "",
  });
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
