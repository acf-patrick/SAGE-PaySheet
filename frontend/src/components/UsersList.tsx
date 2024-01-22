import { FiDelete } from "react-icons/fi";
import styled from "styled-components";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

const StyledUsersList = styled.table`
  border-collapse: collapse;
  width: 75%;
  margin: 20px auto;

  .labels {
    position: absolute;
    left: 1rem;
    top: 6.5rem;
    display: flex;
    gap: 1rem;
    font-size: 1rem;
    font-weight: 600;

    select {
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

    &:nth-child(even) {
      background-color: #f9f9f9;
    }

    &:hover {
      td {
        transition: all 250ms;

        &:not(:last-of-type) {
          background-color: #e5e5e5;
        }
      }
    }
  }

  td {
    padding: 10px;
  }

  thead {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;

    tr {
      height: 4rem;
    }
  }

  tbody {
    tr {
      height: 3rem;
      cursor: pointer;

      td {
        &:last-of-type {
          background-color: white;
          border: none;
          width: 20px;

          svg {
            font-size: 25px;
            transition: color 150ms;
            margin-left: 0.75rem;

            &:hover {
              color: red;
            }
          }
        }
      }
    }
  }

  .confirm-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    z-index: 2;
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
