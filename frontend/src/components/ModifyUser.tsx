import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import "../styles/keyframes.css";
import { User } from "../types";
import { StyledHeader } from "./Paysheets";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 3rem;

  .user-info {
    margin-top: 5rem;
    width: 60%;
    height: 30%;

    .container {
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15%;
        border-bottom: 2px solid grey;
      }
    }
  }
  .role-container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    select {
      height: 30px;
      width: 75px;
    }
  }

  button {
    height: 40px;
    background-color: ${({ theme }) => theme.modifyUser.background};
    width: 120px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    transition: background-color 250ms;

    &:hover {
      background-color: ${({ theme }) => theme.modifyUser.hover};
    }
  }

  .spinner {
    font-size: 25px;
    animation: rotate linear infinite 750ms;
  }
`;

function ModifyUser() {
  const { id } = useParams();

  const [user, setUser] = useState<Map<string, string>>(
    new Map<string, string>([
      ["Nom", ""],
      ["Prenoms", ""],
      ["Identifiant", ""],
      ["Role", ""],
    ])
  );

  const [pending, setPending] = useState(false);

  const [modify, setModify] = useState(false);
  const labels: string[] = ["Nom", "Prenoms", "Identifiant", "Role"];

  const handleSubnit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);

    const formData = new FormData(e.currentTarget);

    const updatedUser: User = {
      id: id!,
      name: formData.get("Nom")
        ? formData.get("Nom")!.toString()
        : user.get("Nom")!,
      lastName: formData.get("Prenoms")
        ? formData.get("Prenoms")!.toString()
        : user.get("Prenoms")!,
      username: formData.get("Identifiant")
        ? formData.get("Identifiant")!.toString()
        : user.get("Identifiant")!,
      role: formData.get("Role")
        ? formData.get("Role")!.toString()
        : user.get("Role")!,
    };
    api
      .patch("user", updatedUser)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPending(false));
  };

  useEffect(() => {
    api.get("user/" + id).then((res) => {
      setUser(
        new Map<string, string>([
          ["Nom", res.data.name],
          ["Prenoms", res.data.lastName],
          ["Identifiant", res.data.username],
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
      <StyledForm onSubmit={handleSubnit}>
        <div className="user-info">
          {Array.from([0, 1, 2]).map((i) =>
            !modify ? (
              <div key={labels[i]} className="container">
                <div className="info">
                  <h3>{labels[i]}:</h3>
                  <p>{user.get(labels[i])}</p>
                  <FiEdit3 onClick={() => setModify(true)} />
                </div>
              </div>
            ) : (
              <div key={labels[i]}>
                <input
                  name={labels[i]}
                  type="text"
                  defaultValue={user.get(labels[i])}
                  onChange={(e) => user.set(labels[i], e.currentTarget.value)}
                />
              </div>
            )
          )}
          <div className="role-container">
            <h3>Role:</h3>
            <label htmlFor="ADMIN">
              Admin
              <input
                type="checkbox"
                name="ADMIN"
                id="ADMIN"
                value="ADMIN"
                defaultChecked={
                  user.get("Role")
                    ? user.get("Role")?.toString() == "ADMIN"
                    : false
                }
              />
            </label>
          </div>
        </div>
        <button>
          {pending ? (
            <CgSpinner className="spinner" />
          ) : (
            <span>Sauvegarder</span>
          )}
        </button>
      </StyledForm>
    </>
  );
}

export default ModifyUser;
