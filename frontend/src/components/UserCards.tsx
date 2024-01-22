import styled from "styled-components";
import { User } from "../types";
import { UserInfo } from "./UserEdit";
import { useNavigate } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

const StyledUserCards = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  gap: 2rem;

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20%;
    height: 20rem;
    border: 2px solid grey;
    border-radius: 10px;
    padding: 5px;
    transform: scale(1);
    transition: transform 300ms;
    animation: fadeIn linear 250ms;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }

    .profile {
      width: 100%;
      height: 45%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid grey;
      background-color: grey;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }

    .delete {
      font-size: x-large;
      width: 100%;
      height: 3rem;
      margin: 0 13% 0 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      background-color: #f1f1f1;
      color: gray;
      transition: color 200ms, background-color 200ms;
      &:hover {
        color: white;
        background-color: #fcdfdf;
      }
    }
  }
`;

function UserCards({
  users,
  setConfirmDelete,
}: {
  users: User[];
  setConfirmDelete: (i: number, e: React.MouseEvent<HTMLElement>) => void;
}) {
  const navigate = useNavigate();

  return (
    <StyledUserCards>
      {users.map((user, i) => (
        <div
          className="card"
          key={user.username}
          onClick={() =>
            navigate({
              pathname: "/user/" + users[i].id,
            })
          }
        >
          <div className="profile">Placeholder Image</div>
          <UserInfo>
            <p>
              <span>Full name:</span>
              {user.name + " " + user.lastName}
            </p>
            <p>
              <span>UserName:</span>
              {user.username}
            </p>
            <p>
              <span>Role:</span>
              {user.role}
            </p>
          </UserInfo>
          <div className="delete" onClick={(e) => setConfirmDelete(i, e)}>
            <FiDelete />
          </div>
        </div>
      ))}
    </StyledUserCards>
  );
}

export default UserCards;
