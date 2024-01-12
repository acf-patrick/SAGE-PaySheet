import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

const months: string[] = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const StyledFilters = styled.div<{ $show: boolean }>`
  width: ${(props) => (props.$show ? "25%" : "0")};
  height: 100%;
  background-color: white;
  position: absolute;
  right: 0px;
  box-shadow: 0 0 10px 5px #8080807c;
  transition: width 250ms;
  z-index: 100;

  svg {
    display: ${(props) => (props.$show ? "block" : "none")};
    color: grey;
    font-size: 45px;
    cursor: pointer;
    position: absolute;
    right: 0;
    transition: color 250ms;

    &:hover {
      color: #ddd5d5;
    }
  }
`;

function Filters({
  show,
  setFilters,
  yearsBoundaries,
}: {
  show: boolean;
  setFilters: (date: { month: number; year: number }) => void;
  yearsBoundaries: { upper: number; lower: number };
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData.get("month"));
    console.log(formData.get("year"));
    setFilters({
      month: parseInt(formData.get("month")!.toString()),
      year: parseInt(formData.get("year")!.toString()),
    });
  };

  const handleSetFilters = () => {
    setFilters({
      month: -1,
      year: -1,
    });
  };

  return (
    <StyledFilters $show={show}>
      <IoMdClose onClick={handleSetFilters} />
      <form className="date-picker" onSubmit={handleSubmit}>
        <label htmlFor="month">Mois</label>
        <select name="month" id="month">
          {months.map((month, i) => (
            <option value={i}>{month}</option>
          ))}
        </select>
        <label htmlFor="year">Année</label>
        <select name="year" id="year">
          {Array.from(
            { length: yearsBoundaries.lower - yearsBoundaries.lower + 1 },
            (_, index) => index + yearsBoundaries.lower
          ).map((i) => (
            <option value={i}>{i}</option>
          ))}
        </select>
        <button>Filtrer</button>
      </form>
    </StyledFilters>
  );
}

export default Filters;
