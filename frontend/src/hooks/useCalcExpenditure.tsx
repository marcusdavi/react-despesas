import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getMonth, getMonthName, getYear } from "../helpers/dateHelpers";
import {
  IExpenditure,
  IExpenditureAbstract,
  IExpenditureData,
} from "../interfaces/Interfaces";
import {
  getExpendituresEndpoint,
  getExpendituresMonthYearEndpoint,
} from "../services/apiService";

export function useCalcExpenditure(month: string): IExpenditureData {
  const monthSelected = getMonth(month);
  const yearSelected = getYear(month);
  const [expenditures, setExpenditures] = useState<IExpenditure[]>([]);
  const [yearsSelect, setYearsSelect] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [expendituresAbstract, setExpendituresAbstract] = useState<
    IExpenditureAbstract[]
  >([]);

  useEffect(() => {
    getExpendituresMonthYearEndpoint(yearSelected + "-" + monthSelected).then(
      (expendituresMonth) => {
        setExpenditures(expendituresMonth);
        setExpendituresAbstract(
          calculateCategoryExpenditures(expendituresMonth)
        );
        setTotal(calculateTotal(expendituresMonth));
        if (expendituresMonth.length === 0) {
          const monthName = getMonthName(monthSelected);
          toast.info(
            `There aren't expenditures for ${monthName} ${yearSelected}`,
            {
              theme: "light",
              autoClose: 3000,
            }
          );
        }
      },
      (e) =>
        toast.error("API Internal Error", {
          theme: "light",
          autoClose: 3000,
        })
    );
  }, [yearSelected, monthSelected]);

  useEffect(() => {
    getExpendituresEndpoint().then((expenditures) => {
      const years = expenditures.map((d) => d.monthYear.substring(0, 4));
      setYearsSelect(years.filter(onlyUnique));
    });
  }, []);

  return {
    expenditures,
    expendituresAbstract,
    yearsSelect,
    total,
  };
}

function calculateTotal(expenditures: IExpenditure[]) {
  const total = expenditures.reduce((acc, curr) => {
    return acc + curr.totalValue;
  }, 0);
  return total;
}

function onlyUnique(value: any, index: any, self: string | any[]) {
  return self.indexOf(value) === index;
}

function calculateCategoryExpenditures(expenditures: IExpenditure[]) {
  const expendituresAbstract: IExpenditureAbstract[] = [];
  const monthYear = expenditures.length > 0 ? expenditures[0].monthYear : "";
  const categories = expenditures.map((e) => e.category).filter(onlyUnique);
  for (const category of categories) {
    const totalValue = expenditures
      .filter((e) => e.category === category)
      .reduce((acc, curr) => {
        return acc + curr.totalValue;
      }, 0);
    expendituresAbstract.push({
      category,
      totalValue,
      monthYear,
    });
  }
  return expendituresAbstract.sort((a, b) => b.totalValue - a.totalValue);
}
