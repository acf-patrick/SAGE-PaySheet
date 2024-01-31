import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../api";
import RoleContext from "../contexts/AdminUser";

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

  @media (width <= 480px) {
    width: 75%;
    font-size: small;
  }
  @media (480px <= width <= 768px) {
    width: 60%;
    font-size: medium;
  }
  @media (768px <= width <= 1024px) {
    width: 40%;
    font-size: medium;
  }
  @media (1024px <=width <=1440px) {
    width: 30%;
    font-size: medium;
  }
  @media (1440px <=width <=2560px) {
    width: 20%;
    font-size: medium;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 25%;
      @media (width <= 480px) {
        width: 20%;
        font-size: small;
      }
      @media (480px <=width<= 768px) {
        width: 20%;
        font-size: medium;
      }
    }
    h2 {
      text-align: center;
      margin-bottom: 20px;
      @media (width <=480px) {
        font-size: x-large;
      }
      @media (480px <=width <= 768px) {
        font-size: x-large;
      }
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
    @media (width <=480px) {
      width: 75%;
      font-size: medium;
    }
    @media (480px <=width <= 768px) {
      width: 60%;
      font-size: medium;
    }

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
    @media (width <=480px) {
      font-size: small;
    }
    @media (480px <=width <= 768px) {
      font-size: small;
    }

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
    @media (width <=480px) {
      height: 50px;
    }
  }

  .show {
    opacity: 1;
  }

  .signup {
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    @media (width <=480px) {
      margin-top: 5rem;
    }

    @media (480px <=width <= 768px) {
      margin-top: 5rem;
    }

    &:hover {
      color: grey;
    }
  }
`;

export const Login = () => {
  const { isUserAdmin, setIsUserAdmin } = useContext(RoleContext);
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
        console.log(res.data.user.role);
        setIsUserAdmin(res.data.user.role == "ADMIN");
        localStorage.clear();
        localStorage.setItem("userId", res.data.user.id);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        res.data.user.role == "ADMIN"
          ? navigate("/alluser")
          : navigate("/paysheets");
      })
      .catch((err) => {
        console.log("Error when authenticating");
        console.log(err);
        errorRef.current?.classList.add("show");
        setTimeout(() => errorRef.current?.classList.remove("show"), 2000);
      });
  };

  useEffect(() => {
    console.log("isUserAdmin: " + isUserAdmin);
  }, [isUserAdmin]);

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
        <a className="signup" href={location.href + "signup"}>
          Créer compte
        </a>
      </LoginFormContainer>
    </LoginContainer>
  );
};
