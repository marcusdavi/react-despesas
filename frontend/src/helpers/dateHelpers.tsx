export function getMonthYearToday(){
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2,"0");
  return `${year}-${month}`;
}

export function getYear(monthYear: string){
  return monthYear.substring(0,4);
}

export function getMonth(monthYear: string){
  return monthYear.substring(5,7);
}