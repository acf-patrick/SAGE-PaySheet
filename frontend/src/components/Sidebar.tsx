import { AiOutlinePoweroff } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ExportXlsxButton from "./ExportXlsxButton";
import styled from "styled-components";
import RoleContext from "../contexts/AdminUser";
import { useContext, useEffect } from "react";
import { api } from "../api";

const StyledSideBar = styled.div<{ $toggle: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 1rem;
  gap: 1rem;
  height: 75%;
  width: 30%;
  transition: transform 250ms;
  transform: ${({ $toggle }) =>
    window.innerWidth <= 480
      ? `translateX(${$toggle ? "0" : "-100%"})`
      : "unset"};

  @media (width <= 480px) {
    width: 50%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    background-color: #656161ff;
    align-items: flex-start;
    justify-content: flex-start;
  }

  & > svg {
    font-size: 2rem;
    color: white;
    margin: 0.5rem 0 1rem 0.75rem;
  }

  button {
    width: 9rem;
    height: 50px;
    border-radius: 5px;
    border: none;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 350ms;
    color: white;

    &:first-of-type {
      background-color: #09b809ff;
    }

    &:last-of-type {
      background-color: #df1c1cff;
    }

    &:hover {
      &:first-of-type {
        background-color: #04cf04;
      }

      &:last-of-type {
        background-color: red;
      }
    }

    @media (width <= 480px) {
      width: 75%;
      height: 40px;
      margin: 0 auto;
      color: white;

      &:first-of-type {
        background-color: #0de10d94;
      }

      &:last-of-type {
        background-color: #df1c1cb9;
      }
    }

    svg {
      font-size: 25px;
      margin: 0;

      @media (width <= 480px) {
        font-size: 20px;
      }
    }

    span {
      font-size: 15px;

      @media (width <= 480px) {
        font-size: 12px;
      }
    }
  }

  .user-list {
    background-color: #1e67e5;

    &:hover {
      background-color: #3780ff;
    }
  }
`;

function Sidebar({
  schema,
  data,
  toggle,
  setToggle,
  fileName,
}: {
  schema: any;
  data: any;
  toggle: boolean;
  setToggle: (b: boolean) => void;
  fileName: string;
}) {
  const navigate = useNavigate();

  const { isUserAdmin, setIsUserAdmin } = useContext(RoleContext);

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    api
      .get("user/role/" + localStorage.getItem("userId"))
      .then((res) => {
        setIsUserAdmin(res.data == "ADMIN");
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
        navigate("login");
      });
  }, [window.location]);

  return (
    <StyledSideBar $toggle={toggle}>
      {window.innerWidth <= 480 ? (
        <IoMdCloseCircleOutline onClick={() => setToggle(false)} />
      ) : null}
      <ExportXlsxButton schema={schema} data={data} fileName={fileName} />
      {isUserAdmin ? (
        <button
          className="user-list"
          onClick={() =>
            navigate({
              pathname: window.location.pathname.includes("alluser")
                ? "/user/" + localStorage.getItem("userId")
                : "/alluser",
            })
          }
        >
          {window.location.pathname.includes("alluser")
            ? "Compte"
            : "Liste utilisateurs"}
        </button>
      ) : null}
      <button onClick={logOut}>
        <AiOutlinePoweroff /> <span>Deconnexion</span>
      </button>
    </StyledSideBar>
  );
}

export default Sidebar;
