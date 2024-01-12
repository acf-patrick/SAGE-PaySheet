import { useEffect, useRef, useState } from "react";
import { RiFilter3Line } from "react-icons/ri";
import {
  TbZodiacAquarius,
  TbZodiacAries,
  TbZodiacCancer,
  TbZodiacCapricorn,
  TbZodiacGemini,
  TbZodiacLeo,
  TbZodiacLibra,
  TbZodiacPisces,
  TbZodiacSagittarius,
  TbZodiacScorpio,
  TbZodiacTaurus,
  TbZodiacVirgo,
} from "react-icons/tb";
import styled from "styled-components";
import { api } from "../api";
import "../styles/keyframes.css";
import { Paysheet, UserDto } from "../types";
import Filters from "./Filter";

const monthColors = [
  "#FF5733",
  "#FFC300",
  "#4CAF50",
  "#3F51B5",
  "#FF4081",
  "#00BCD4",
  "#FF5252",
  "#673AB7",
  "#03A9F4",
  "#FF9800",
  "#E91E63",
  "#009688",
];

const zodiacSigns = [
  <TbZodiacCapricorn />,
  <TbZodiacAquarius />,
  <TbZodiacPisces />,
  <TbZodiacAries />,
  <TbZodiacTaurus />,
  <TbZodiacGemini />,
  <TbZodiacCancer />,
  <TbZodiacLeo />,
  <TbZodiacVirgo />,
  <TbZodiacLibra />,
  <TbZodiacScorpio />,
  <TbZodiacSagittarius />,
];

const StyledHeader = styled.h2<{ $scrolled: boolean }>`
  margin: 0;
  position: sticky;
  top: 0;
  left: 0;
  min-height: 75px;
  text-align: center;
  background-color: grey;
  box-shadow: ${(props) =>
    props.$scrolled ? "0 0 5px 5px #8080809a" : "none"};
  transition: border-bottom 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    margin-left: 50px;
    width: 50px;
  }

  svg {
    margin-right: 50px;
    font-size: 35px;
    cursor: pointer;
  }
`;

const PaysheetItem = styled.div<{ $color: string }>`
  cursor: pointer;
  border: 2px solid #ccc;
  padding: 10px;
  width: 30%;
  height: 30vh;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #8080806c;
  transition: box-shadow 250ms;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    border: solid #0000007e 2px;
  }

  .icon {
    display: grid;
    place-items: center;
    flex-grow: 1;
    font-size: 5rem;
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.$color};
    height: 75px;
    width: 100%;
    border-radius: 5px;
    color: white;
    font-weight: 600;
  }
`;

const PaysheetsContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;

  .paysheets-list-container {
    width: 100%;
    display: flex;
    justify-content: center;

    .paysheets-list {
      margin: 0;
      padding: 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
    }
  }
`;

function Paysheets() {
  const [paysheets, setPaysheets] = useState<Paysheet[]>([]);
  const [filteredPaysheets, setFilteredPaysheets] = useState<Paysheet[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<UserDto>({
    lastName: "",
    name: "",
    username: "",
  });
  const [filters, setFilters] = useState({
    month: -1,
    year: -1,
  });

  const [showFilters, setShowFilters] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 0);
  };

  const getYearsBoundaries = () => {
    if (!paysheets || paysheets.length == 0) {
      return {
        lower: 0,
        upper: 0,
      };
    }

    const sorted = paysheets.sort((p1: Paysheet, p2: Paysheet) => {
      const d1 = new Date(p1.date);
      const d2 = new Date(p2.date);
      return d1 < d2 ? -1 : 1;
    });

    return {
      lower: new Date(sorted[0].date).getFullYear(),
      upper: new Date(sorted[sorted.length - 1].date).getFullYear(),
    };
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => console.log(scrolled), [scrolled]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      api.get("user/" + userId).then((res) => {
        setUser({
          name: res.data.name,
          lastName: res.data.lastName,
          username: res.data.username,
        });
        setPaysheets(
          res.data.paysheets.sort((p1: Paysheet, p2: Paysheet) => {
            const d1 = new Date(p1.date);
            const d2 = new Date(p2.date);
            return d1 > d2 ? -1 : 1;
          })
        );
        setFilteredPaysheets(
          res.data.paysheets.sort((p1: Paysheet, p2: Paysheet) => {
            const d1 = new Date(p1.date);
            const d2 = new Date(p2.date);
            return d1 > d2 ? -1 : 1;
          })
        );
      });
    } else {
      localStorage.clear();
      location.pathname = "/";
    }
  }, []);

  useEffect(() => {
    if (filters.month < 0 && filters.year < 0) {
      setFilteredPaysheets(paysheets);
      console.log("filter empty");
      return;
    }

    console.log(filters);

    setFilteredPaysheets(
      paysheets.filter((paysheet) => {
        const paysheetMonth = new Date(paysheet.date).getMonth();
        const paysheetYear = new Date(paysheet.date).getFullYear();
        let res = true;
        if (filters.month >= 0) {
          res = paysheetMonth == filters.month;
          if (filters.year >= 0) {
            res = paysheetYear == filters.year;
          }
        } else {
          if (filters.year >= 0) {
            res = paysheetYear == filters.year;
          }
        }
        return res;
      })
    );

    console.log(
      paysheets.filter((paysheet) => {
        const paysheetMonth = new Date(paysheet.date).getMonth();
        const paysheetYear = new Date(paysheet.date).getFullYear();
        let res = true;
        if (filters.month >= 0) {
          res = paysheetMonth == filters.month;
        }
        if (filters.year >= 0) {
          res = paysheetYear == filters.year;
        }
        return res;
      })
    );
  }, [filters]);

  useEffect(() => {
    containerRef.current!.style.overflowY = showFilters ? "hidden" : "auto";
  }, [showFilters]);

  return (
    <PaysheetsContainer ref={containerRef} onScroll={handleScroll}>
      <StyledHeader $scrolled={scrolled}>
        <img src="../../public/paysheet.svg" alt="" />
        <span>{`Paysheets for ${user?.name}`}</span>
        <RiFilter3Line
          title="Filtrer"
          onClick={() => setShowFilters(showFilters ? false : true)}
        />
      </StyledHeader>
      <div className="paysheets-list-container">
        <div className="paysheets-list">
          {filteredPaysheets.map((paysheet, i) => (
            <PaysheetItem $color={monthColors[i]} key={i}>
              <div className="icon">{zodiacSigns[i]}</div>
              <span>
                {`Date: ${new Date(paysheet.date).toLocaleDateString()}`}
              </span>
            </PaysheetItem>
          ))}
        </div>
      </div>
      <Filters
        show={showFilters}
        setFilters={setFilters}
        yearsBoundaries={getYearsBoundaries()}
      />
    </PaysheetsContainer>
  );
}

export default Paysheets;
