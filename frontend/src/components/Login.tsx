import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
  background-image: url("../../images/auth-bg.png");
`;

const LoginFormContainer = styled.form`
  width: 25%;
  height: 75%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 25%;
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
    }
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
  }

  input {
    width: 75%;
    padding: 12px;
    margin-bottom: 16px;
    border: 2px solid black;
    border-radius: 4px;
    background: whitesmoke;
    transition: border 250ms;
    font-family: "Ubuntu";
    font-weight: 600;

    &:hover {
      border: 2px solid grey;
      cursor: pointer;
    }

    &:focus {
      outline: none;
      cursor: text;
    }
  }

  button {
    margin-top: 1rem;
    width: 150px;
    height: 45px;
    padding: 10px;
    background-color: ${({ theme }) => theme.login.button.background};
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    letter-spacing: 1px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.login.button.hover};
    }
  }

  .error {
    opacity: 0;
    background-color: ${({ theme }) => theme.login.error.background};
    height: 65px;
    width: 80%;
    border-radius: 5px;
    display: grid;
    place-items: center;
    color: red;
    font-weight: 600;
    transition: opacity 250ms;
  }

  .show {
    opacity: 1;
  }
`;

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("auth/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.clear();
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        navigate("/paysheets");
      })
      .catch((err) => {
        console.log("Error when authenticating");
        console.log(err);
        errorRef.current?.classList.add("show");
        setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      });
  };

  return (
    <LoginContainer>
      <LoginFormContainer onSubmit={handleSubmit}>
        <div className="header">
          <img src="../public/paysheet.svg" alt="logo" />
          <h2>PaySheet</h2>
        </div>
        <label htmlFor="username">Identifiant</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Mot de passe:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Connexion</button>
        <p className="error" ref={errorRef}>
          Identifiant ou mot de passe invalide
        </p>
      </LoginFormContainer>
    </LoginContainer>
  );
};
