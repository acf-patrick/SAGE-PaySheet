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

    .slider {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .slider-container {
        background-color: gray;
        border-radius: 16px;
        width: 2rem;
        height: 1rem;
        padding: 1px;

        .slider-circle {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background-color: #f1f1f1;
          transform: translateX(100%);
          transition: transform 250ms, background-color 250ms;
        }
      }
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
const UserInfo = styled.div`
  width: 35%;
  .infos {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    p {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
  }
`;
function ModifyUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [pending, setPending] = useState(false);
  const [modify, setModify] = useState(false);
  const labels: string[] = ["Nom", "Prenoms", "Identifiant", "Role"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPending(true);

    const formData = new FormData(e.currentTarget);

    api
      .patch("user")
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPending(false));
  };

  const handleSlide = () => {
    const circle = document.querySelector(".slider-circle") as HTMLDivElement;
    circle.style.transform = "translateX(0)";
  };

  useEffect(() => {
    api.get("user/" + id).then((res) => {
      setName(res.data.name);
      setLastName(res.data.lastName);
      setUsername(res.data.username);
      setRole(res.data.role);
    });
  }, []);

  return (
    <>
      <StyledHeader>
        <img src="../../public/paysheet.svg" alt="" />
        <span>{name + " " + lastname}</span>
        <div style={{ width: "2rem" }}></div>
      </StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <UserInfo>
          {!modify ? (
            <div className="infos">
              <p>
                <strong>Nom: </strong>
                {" " + name}
                <FiEdit3 />
              </p>
              <p>
                <strong>Prénoms: </strong>
                {" " + lastname}
                <FiEdit3 />
              </p>
              <p>
                <strong>Identifiant: </strong>
                {" " + username}
                <FiEdit3 />
              </p>
            </div>
          ) : (
            <div></div>
          )}
          {/* {Array.from([0, 1, 2]).map((i) =>
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
                  onChange={(e) => {
                    setName[]
                    user.set(labels[i], e.currentTarget.value)}}
                />
              </div>
            )
          )} */}
          <div className="role-container">
            <h3>Role:</h3>
            <div className="slider">
              Admin
              <div className="slider-container">
                <div className="slider-circle" onClick={handleSlide}></div>
              </div>
              User
            </div>
          </div>
        </UserInfo>
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
