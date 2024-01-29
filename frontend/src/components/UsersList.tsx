import { FiDelete } from "react-icons/fi";
import styled from "styled-components";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

const StyledUsersList = styled.table`
  border-collapse: collapse;
  width: 75%;
  margin: 20px auto;
  user-select: none;
  @media (width <= 480px) {
    margin-top: 5rem;
    width: 95%;
    font-size: 15.5px;
  }
  @media (480px <= width <= 768px) {
    margin-top: 5rem;
    width: 95%;
    font-size: 15.5px;
  }
  @media (768px <= width <= 1024px) {
    margin-top: 5rem;
    width: 95%;
    font-size: 15.5px;
  }

  .labels {
    user-select: none;
    position: absolute;
    left: 1rem;
    top: 6.5rem;
    display: flex;
    gap: 1rem;
    font-size: 1rem;
    font-weight: 600;
    @media (width <= 480px) {
      user-select: none;
      top: 4.5rem;
      left: 0;
      width: calc(100% - 2rem);
      justify-content: center;
    }
    @media (480px <= width <= 768px) {
      user-select: none;
      top: 4.5rem;
      left: 0;
      width: calc(97.9% - 3rem);
      justify-content: center;
    }
    @media (768px <= width <= 1024px) {
      user-select: none;
      top: 4.5rem;
      left: 0;
      width: calc(98.4% - 3rem);
      justify-content: flex-start;
      padding-left: 2rem;
    }

    select {
      user-select: none;
      cursor: pointer;
      width: 100px;
      text-align: center;
      font-weight: 600;
      font-size: 1.1rem;
      border-radius: 5px;
    }
  }

  tr {
    transition: all 250ms;
    user-select: none;

    &:nth-child(even) {
      user-select: none;
      background-color: #f9f9f9;
    }

    &:hover {
      td {
        user-select: none;
        transition: all 250ms;

        &:not(:last-of-type) {
          background-color: #e5e5e5;
        }
      }
    }
  }

  td {
    user-select: none;
    padding: 10px;
    @media (width <= 480px) {
      padding: 0 2.5px;
    }
  }

  thead {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    user-select: none;

    tr {
      user-select: none;
      height: 4rem;
    }
  }

  tbody {
    user-select: none;
    tr {
      user-select: none;
      height: 3rem;
      cursor: pointer;

      td {
        user-select: none;
        &:last-of-type {
          user-select: none;
          background-color: white;
          border: none;
          width: 20px;
          @media (width <= 480px) {
            width: 20px;
          }

          svg {
            font-size: 25px;
            transition: color 150ms;
            user-select: none;
            margin-left: 0.75rem;
            @media (width <= 480px) {
              font-size: 17px;
              margin-left: 0.5px;
            }

            &:hover {
              color: red;
            }
          }
        }
      }
    }
  }
`;

function UsersList({
  users,
  setSort,
  setConfirmDelete,
}: {
  users: User[];
  setSort: (s: string) => void;
  setConfirmDelete: (i: number, e: React.MouseEvent<SVGElement>) => void;
}) {
  const navigate = useNavigate();

  return (
    <StyledUsersList>
      <div className="labels">
        <p>Trier:</p>
        <select
          id="select"
          name="Trier"
          onChange={(e) => setSort(e.currentTarget.value)}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      <thead>
        <tr>
          <td>Nom</td>
          <td>Identifiant</td>
          <td>Role</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <tr
            key={user.username}
            onClick={() =>
              navigate({
                pathname: "/user/" + users[i].id,
              })
            }
          >
            <td>
              {user.name} {user.lastName}
            </td>
            <td>{user.username}</td>
            <td>{user.role}</td>
            <td>
              <FiDelete onClick={(e) => setConfirmDelete(i, e)} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledUsersList>
  );
}

export default UsersList;
