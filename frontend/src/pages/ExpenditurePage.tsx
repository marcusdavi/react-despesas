import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ExpenditureHeader from "../components/ExpenditureHeader";
import ExpenditureTable from "../components/ExpenditureTable";
import { getMonth, getYear } from "../helpers/dateHelpers";
import { formatNumber } from "../helpers/numberHelpers";
import { IExpenditure } from "../interfaces/Interfaces";
import { getExpendituresEndpoint, getExpendituresMonthYearEndpoint } from "../services/apiService";

export default function DespesaPage() {
  const { monthYear } = useParams<{ monthYear: string }>();
  const [yearsSelect, setYearsSelect] = useState<string[]>([]);
  const monthSelected = getMonth(monthYear);
  const yearSelected = getYear(monthYear);
  const [expenditures, setExpenditures] = useState<IExpenditure[]>([]);

  useEffect(() => {
    getExpendituresMonthYearEndpoint(yearSelected+"-"+monthSelected).then((expendituresMonth) => {
      setExpenditures(expendituresMonth);
    });
  }, [yearSelected,monthSelected]);

  useEffect(() => {
    getExpendituresEndpoint().then((expenditures) => {
      const years = expenditures.map(d => d.mes.substring(0,4));
      setYearsSelect(years.filter(onlyUnique));

      function onlyUnique(value: any, index: any, self: string | any[]) {
        return self.indexOf(value) === index;
      }
    });
  }, []);

  return (
    <div>
      <ExpenditureHeader
        total={calculateTotal(expenditures)}
        month={monthSelected}
        year={yearSelected} yearsSelect={yearsSelect}      />
      <ExpenditureTable expenditures={expenditures} />
    </div>
  );
}

function calculateTotal(expenditures: IExpenditure[]) {
  const total = expenditures.reduce((acc, curr) => {
    return acc + curr.valor;
  }, 0);
  return formatNumber(total);
}
