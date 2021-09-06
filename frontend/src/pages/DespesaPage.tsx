import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DespesaHeader from "../components/DespesaHeader";
import DespesaTable from "../components/DespesaTable";
import { getMonth, getYear } from "../helpers/dateHelpers";
import { formatNumber } from "../helpers/numberHelpers";
import { IDespesa } from "../interfaces/Interfaces";
import { getDespesasEndpoint, getDespesasMonthYearEndpoint } from "../services/apiService";

export default function DespesaPage() {
  const { monthYear } = useParams<{ monthYear: string }>();
  const [anos, setAnos] = useState<string[]>([]);
  const monthSelected = getMonth(monthYear);
  const yearSelected = getYear(monthYear);
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    getDespesasMonthYearEndpoint(yearSelected+"-"+monthSelected).then((response) => {
      setDespesas(response);
    });
  }, [yearSelected,monthSelected]);

  useEffect(() => {
    getDespesasEndpoint().then((despesasMes) => {
      const years = despesasMes.map(d => d.mes.substring(0,4));
      setAnos(years.filter(onlyUnique));

      function onlyUnique(value: any, index: any, self: string | any[]) {
        return self.indexOf(value) === index;
      }
    });
  }, []);

  return (
    <div>
      <DespesaHeader
        total={calculateTotal(despesas)}
        month={monthSelected}
        year={yearSelected} years={anos}      />
      <DespesaTable despesas={despesas} />
    </div>
  );
}

function calculateTotal(despesas: IDespesa[]) {
  const total = despesas.reduce((acc, curr) => {
    return acc + curr.valor;
  }, 0);
  return formatNumber(total);
}
