import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DespesaHeader from "../components/DespesaHeader";
import DespesaTable from "../components/DespesaTable";
import { getMonth, getYear } from "../helpers/dateHelpers";
import { formatNumber } from "../helpers/numberHelpers";
import { IDespesa } from "../interfaces/Interfaces";
import { getDespesasMonthYearEndpoint } from "../services/apiService";

export default function DespesaPage() {
  const { month } = useParams<{ month: string }>();
  const [mesDespesa, setMesDespesa] = useState(getMonth(month));
  const [anoDespesa, setAnoDespesa] = useState(getYear(month));
  const [despesas, setDespesas] = useState<IDespesa[]>([]);

  useEffect(() => {
    getDespesasMonthYearEndpoint("2021-01").then((despesasMes) => {
      setDespesas(despesasMes);
    });
  }, [mesDespesa, anoDespesa]);

  return (
    <div>
      <DespesaHeader
        total={calcularTotal(despesas)}
        month={mesDespesa}
        year={anoDespesa}
      />
      <DespesaTable despesas={despesas} />
    </div>
  );
}

function calcularTotal(despesas: IDespesa[]) {
  const total = despesas.reduce((acc, curr) => {
    return acc + curr.valor;
  }, 0);
  return formatNumber(total);
}
