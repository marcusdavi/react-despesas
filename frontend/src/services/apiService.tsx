import { IDespesa } from "../interfaces/IDespesa";

export function getDespesasEndpoint(): Promise<IDespesa[]> {
  return fetch("http://localhost:3001/despesas").then((resp) => {
    return resp.json();
  });
}

export async function getDespesasMonthYearEndpoint(
  mesAno: string
): Promise<IDespesa[]> {
  return await fetch(
    `http://localhost:3001/despesas?mes=${mesAno}&_sort=dia`
  ).then((resp) => {
    return resp.json();
  });
}
