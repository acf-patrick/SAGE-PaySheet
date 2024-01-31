import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import styled from "styled-components";

const StyledTableHeaderSorter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  cursor: pointer;
`;

function TableHeaderSorter({
  header,
  sort,
  sortValues,
  setSort,
}: {
  header: string;
  sort: string;
  sortValues: string[];
  setSort: (s: string) => void;
}) {
  return (
    <StyledTableHeaderSorter
      onClick={() =>
        setSort(sort == sortValues[0] ? sortValues[1] : sortValues[0])
      }
    >
      <span>{header}</span>
      {sort == sortValues[0] || sort == "" ? (
        <MdArrowDropUp />
      ) : sort == sortValues[1] ? (
        <MdArrowDropDown />
      ) : (
        <MdArrowDropDown color="transparent" />
      )}
    </StyledTableHeaderSorter>
  );
}

export default TableHeaderSorter;
