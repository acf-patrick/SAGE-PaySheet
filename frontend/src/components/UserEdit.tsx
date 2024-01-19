import { useEffect } from "react";
import styled from "styled-components";

const StyledSlider = styled.div<{ $isAdmin: boolean }>`
  background-color: ${(props) => (props.$isAdmin ? "green" : "grey")};
  border-radius: 16px;
  width: 2rem;
  height: 1rem;
  padding: 1px;
  cursor: pointer;

  .slider-circle {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #f1f1f1;
    transform: ${(props) =>
      props.$isAdmin ? "translateX(0)" : "translateX(100%)"};
    transition: transform 250ms, background-color 250ms;
  }
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
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
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    h3 {
      width: 50%;
    }
    p {
      width: auto;
    }
    label {
      margin-top: 0.8rem;
      width: 50%;
      font-size: large;
      font-weight: bold;
    }
    input {
      margin-top: 0.8rem;
      border: none;
      width: auto;
      height: 2rem;
      border-bottom: 2px solid grey;
      outline: none;
      font-size: medium;
    }
  }
`;

interface userI {
  name: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
}

function UserEdit({
  isAdmin,
  user,
  setUser,
  setIsAdmin,
}: {
  isAdmin: boolean;
  user: userI;
  setUser: (e: userI) => void;
  setIsAdmin: (e: boolean) => void;
}) {
  useEffect(() => {
    console.log(user.role);
    setUser({
      ...user,
      role: isAdmin ? "ADMIN" : "USER",
    });
    console.log(isAdmin);
  }, [isAdmin]);
  return (
    <UserInfo>
      <div>
        <label htmlFor="name">Nom: </label>
        <input
          type="text"
          defaultValue={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.currentTarget.value,
            })
          }
          id="name"
          name="name"
        />
      </div>
      <div>
        <label htmlFor="lastName">Prénom(s): </label>
        <input
          type="text"
          defaultValue={user.lastName}
          onChange={(e) =>
            setUser({
              ...user,
              lastName: e.currentTarget.value,
            })
          }
          id="lastName"
          name="lastName"
        />
      </div>
      <div>
        <label htmlFor="username">Identifiant: </label>
        <input
          type="text"
          defaultValue={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.currentTarget.value,
            })
          }
          id="username"
          name="username"
        />
      </div>
      <div>
        <label htmlFor="password">Mot de passe: </label>
        <input
          type="text"
          defaultValue="********"
          onChange={(e) =>
            setUser({
              ...user,
              password: e.currentTarget.value,
            })
          }
          id="password"
          name="password"
        />
      </div>
      <div className="role-container">
        <h3>Role:</h3>
        <div className="slider">
          Admin
          <StyledSlider $isAdmin={isAdmin} onClick={() => setIsAdmin(!isAdmin)}>
            <div className="slider-circle"></div>
          </StyledSlider>
          User
        </div>
      </div>
    </UserInfo>
  );
}

export default UserEdit;
