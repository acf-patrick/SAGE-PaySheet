import { AiOutlinePoweroff } from "react-icons/ai";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ExportXlsxButton from "./ExportXlsxButton";

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

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="buttons"
      style={{
        transform:
          window.innerWidth <= 480
            ? toggle
              ? "translateX(0)"
              : "translateX(-100%)"
            : "unset",
      }}
    >
      {window.innerWidth <= 480 ? (
        <IoMdCloseCircleOutline onClick={() => setToggle(false)} />
      ) : null}
      <ExportXlsxButton schema={schema} data={data} fileName={fileName} />
      <button onClick={logOut}>
        <AiOutlinePoweroff /> <span>Deconnexion</span>
      </button>
    </div>
  );
}

export default Sidebar;
