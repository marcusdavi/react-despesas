import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ExpenditureHeader from "../components/ExpenditureHeader";
import ExpenditureTable from "../components/ExpenditureTable";
import { getMonth, getMonthName, getYear } from "../helpers/dateHelpers";
import { formatNumber } from "../helpers/numberHelpers";
import { IExpenditure } from "../interfaces/Interfaces";
import {
  getExpendituresEndpoint,
  getExpendituresMonthYearEndpoint,
} from "../services/apiService";

export default function DespesaPage() {
  const { monthYear } = useParams<{ monthYear: string }>();
  const [yearsSelect, setYearsSelect] = useState<string[]>([]);
  const monthSelected = getMonth(monthYear);
  const yearSelected = getYear(monthYear);
  const [expenditures, setExpenditures] = useState<IExpenditure[]>([]);

  useEffect(() => {
    getExpendituresMonthYearEndpoint(yearSelected + "-" + monthSelected).then(
      (expendituresMonth) => {
        setExpenditures(expendituresMonth);
        if (expendituresMonth.length === 0) {
          const monthName = getMonthName(monthSelected);
          toast.info(
            `There aren't expenditures for ${monthName} ${yearSelected}`,
            {
              theme: "light",
              autoClose: 3000
            }
          );
        }
      }
    );
  }, [yearSelected, monthSelected]);

  useEffect(() => {
    getExpendituresEndpoint().then((expenditures) => {
      const years = expenditures.map((d) => d.monthYear.substring(0, 4));
      setYearsSelect(years.filter(onlyUnique));

      function onlyUnique(value: any, index: any, self: string | any[]) {
        return self.indexOf(value) === index;
      }
    });
  }, []);

  return (
    <>
      <ToastContainer style={{ width: "415px"}} />
      <ExpenditureHeader
        total={calculateTotal(expenditures)}
        month={monthSelected}
        year={yearSelected}
        yearsSelect={yearsSelect}
      />
      <ExpenditureTable expenditures={expenditures} />
    </>
  );
}

function calculateTotal(expenditures: IExpenditure[]) {
  const total = expenditures.reduce((acc, curr) => {
    return acc + curr.totalValue;
  }, 0);
  return formatNumber(total);
}
