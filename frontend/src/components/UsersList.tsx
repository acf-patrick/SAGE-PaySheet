import { FiDelete } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { User } from "../types";
import TableHeaderSorter from "./TableHeaderSorter";

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

      &:hover {
        background-color: #e5e5e5;
      }
    }
  }

  tbody {
    user-select: none;
    tr {
      user-select: none;
      height: 3rem;
      cursor: pointer;
      width: 25px;

      td {
        user-select: none;
        @media (width <= 480px) {
          width: 25px;
          font-size: smaller;
        }

        &:last-of-type {
          user-select: none;
          background-color: white;
          border: none;
          width: 20px;
          @media (width <= 480px) {
            width: 20px;
            font-size: small;
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
  sort,
  setSort,
  setConfirmDelete,
}: {
  users: User[];
  sort: string;
  setSort: (s: string) => void;
  setConfirmDelete: (i: number, e: React.MouseEvent<SVGElement>) => void;
}) {
  const navigate = useNavigate();

  return (
    <StyledUsersList>
      <thead>
        <tr>
          <td>
            <TableHeaderSorter
              header="Nom"
              sort={sort}
              setSort={setSort}
              sortValues={["A-Z", "Z-A"]}
            />
          </td>
          <td>
            <TableHeaderSorter
              header="Identifiant"
              sort={sort}
              setSort={setSort}
              sortValues={["IdA-IdZ", "IdZ-IdA"]}
            />
          </td>
          <td>
            <TableHeaderSorter
              header="Role"
              sort={sort}
              setSort={setSort}
              sortValues={["Admin", "User"]}
            />
          </td>
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
