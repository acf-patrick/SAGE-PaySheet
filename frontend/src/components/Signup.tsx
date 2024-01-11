import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import { CgSpinner } from "react-icons/cg";

export type fromDataType = {
  name: string;
  lastName: string;
  username: string;
  password: string;
};

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
  background-image: url("../../images/auth-bg.png");
`;

const SignupFormContainer = styled.form`
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

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
      width: 55px;
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
    width: 150px;
    height: 50px;
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
    height: 75px;
    width: 80%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: red;
    font-weight: 600;
    transition: opacity 250ms;
  }

  .show {
    opacity: 1;
  }

  .show-success {
    opacity: 1;
    color: green;
    background-color: ${({ theme }) => theme.login.success.background};
  }

  .spinner {
    font-size: 25px;
    animation: rotate linear infinite 750ms;
  }
`;

export const Signup = () => {
  const [formData, setFormData] = useState<fromDataType>({
    name: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [pending, setPending] = useState(false);

  const [error, setError] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, lastName, username, password } = formData;

    setPending(true);

    if (name == "") {
      setError("Nom vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (lastName == "") {
      setError("Prénom(s) vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (username == "") {
      setError("Identifiant vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (password == "") {
      setError("Mot de passe vide");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit avoir au moins 8 caractères");
      errorRef.current?.classList.add("show");
      setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      setPending(false);
      return;
    }

    api
      .post("auth/signup", {
        ...formData,
        role: "USER",
      })
      .then((_res) => {
        setPending(false);
        setError("Compte créé avec succès");
        errorRef.current?.classList.add("show-success");
        setTimeout(() => {
          errorRef.current?.classList.remove("show-success");
          navigate("/login");
        }, 2500);
      })
      .catch((err) => {
        console.log("Error when signing up");
        console.log(err);
        errorRef.current?.classList.add("show");
        setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      });
  };

  return (
    <SignupContainer>
      <SignupFormContainer onSubmit={handleSubmit}>
        <div className="header">
          <img src="../public/paysheet.svg" alt="logo" />
          <h2>Souscription</h2>
        </div>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <label htmlFor="lastname">Prénom(s)</label>
        <input
          type="text"
          id="lastname"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <label htmlFor="username">Identifiant</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">
          {pending ? <CgSpinner className="spinner" /> : <span>Souscrire</span>}
        </button>
        <p className="error" ref={errorRef}>
          <span>{error}</span>
        </p>
      </SignupFormContainer>
    </SignupContainer>
  );
};
