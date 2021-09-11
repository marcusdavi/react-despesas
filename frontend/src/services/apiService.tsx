import { IExpenditure, IUser } from "../interfaces/Interfaces";

export function getExpendituresEndpoint(): Promise<IExpenditure[]> {
  return fetch("http://localhost:3001/expenditures", {
    credentials: "include",
  }).then(handleResponse);
}

export async function getExpendituresMonthYearEndpoint(
  mesAno: string
): Promise<IExpenditure[]> {
  return await fetch(
    `http://localhost:3001/expenditures?monthYear=${mesAno}&_sort=day`,
    {
      credentials: "include",
    }
  ).then(handleResponse);
}

export function getUserEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/session/user`, {
    credentials: "include",
  }).then(handleResponse);
}

export function signInEndpoint(
  email: string,
  password: string
): Promise<IUser> {
  return fetch(`http://localhost:3001/session/create`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function signOutEndpoint(): Promise<IUser> {
  return fetch(`http://localhost:3001/session/logout`, {
    credentials: "include",
    method: "POST",
  }).then(handleResponse);
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
