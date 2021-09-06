import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DespesaTable from "../components/DespesaTable";
import { getMonth, getYear } from "../helpers/dateHelpers";
import { IDespesa } from "../interfaces/IDespesa";
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
      Despesas em {month}
      <DespesaTable despesas={despesas} />
    </div>
  );
}
