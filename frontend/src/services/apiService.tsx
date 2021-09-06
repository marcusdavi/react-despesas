import { IExpenditure } from "../interfaces/Interfaces";

export function getExpendituresEndpoint(): Promise<IExpenditure[]> {
  return fetch("http://localhost:3001/despesas").then((resp) => {
    return resp.json();
  });
}

export async function getExpendituresMonthYearEndpoint(
  mesAno: string
): Promise<IExpenditure[]> {
  return await fetch(
    `http://localhost:3001/despesas?mes=${mesAno}&_sort=dia`
  ).then((resp) => {
    return resp.json();
  });
}
