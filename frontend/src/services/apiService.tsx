import { IExpenditure } from "../interfaces/Interfaces";

export function getExpendituresEndpoint(): Promise<IExpenditure[]> {
  return fetch("http://localhost:3001/expenditures").then((resp) => {
    return resp.json();
  });
}

export async function getExpendituresMonthYearEndpoint(
  mesAno: string
): Promise<IExpenditure[]> {
  return await fetch(
    `http://localhost:3001/expenditures?monthYear=${mesAno}&_sort=day`
  ).then((resp) => {
    return resp.json();
  });
}
