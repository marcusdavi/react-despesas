export function getMonthYearToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = formatMonth(date.getMonth() + 1);
  return `${year}-${month}`;
}

function formatMonth(month: number) {
  return month.toString().padStart(2, "0");
}

export function getYear(monthYear: string) {
  return monthYear.substring(0, 4);
}

export function getMonth(monthYear: string) {
  return monthYear.substring(5, 7);
}
