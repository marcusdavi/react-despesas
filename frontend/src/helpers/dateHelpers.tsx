export const allMonths: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getYear(monthYear: string) {
  return monthYear.substring(0, 4);
}

export function getMonth(monthYear: string) {
  return monthYear.substring(5, 7);
}

export function getMonthName(month: string) {
  const index = parseInt(month, 10) - 1;
  return allMonths[index];
}
