import { CgSpinner } from "react-icons/cg";

function Buttons({
  pending,
  callBack,
  error,
  errorRef,
}: {
  pending: boolean;
  callBack?: () => void;
  error: string;
  errorRef: React.LegacyRef<HTMLParagraphElement>;
}) {
  return (
    <div className="my-buttons">
      <button>
        {pending ? <CgSpinner className="spinner" /> : <span>Sauvegarder</span>}
      </button>
      <p className="error" ref={errorRef}>
        <span>{error}</span>
      </p>
      <div className="back-button" onClick={callBack}>
        Retour
      </div>
    </div>
  );
}

export default Buttons;
