import styled from "styled-components";

export const ConfirmButton = styled.div`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadein 150ms;

  .container {
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    font-size: medium;
    text-align: center;
    width: 25%;
    height: 10rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid grey;
    background-color: #fafafa;
    z-index: 2;

    @media (width <= 480px) {
      width: 65%;
    }

    .choice {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      .yes,
      .no {
        border: 1px solid gray;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        height: 2rem;
        font-size: medium;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          color: #000;
          background-color: #e3e3e3;
        }
      }
    }
  }
`;

function ConfirmPopUp({
  callBackValidate,
  callBackStop,
}: {
  callBackValidate: () => void;
  callBackStop: () => void;
}) {
  return (
    <ConfirmButton>
      <div className="container">
        {"Confirmer la suppression ?"}
        <div className="choice">
          <p className="yes" onClick={callBackStop}>
            Non
          </p>
          <p className="no" onClick={callBackValidate}>
            Oui
          </p>
        </div>
      </div>
    </ConfirmButton>
  );
}

export default ConfirmPopUp;
