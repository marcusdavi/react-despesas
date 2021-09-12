import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import ExpenditureHeader from "../components/ExpenditureHeader";
import ExpenditureTableDetail from "../components/ExpenditureTableDetail";
import { getMonth, getMonthName, getYear } from "../helpers/dateHelpers";
import { formatNumber } from "../helpers/numberHelpers";
import {
  IExpenditure,
  IExpenditureAbstract
} from "../interfaces/Interfaces";
import {
  getExpendituresEndpoint,
  getExpendituresMonthYearEndpoint,
} from "../services/apiService";
import ExpenditureTableAbstract from "../components/ExpenditureTableAbstract";

export default function DespesaPage() {
  const { monthYear } = useParams<{ monthYear: string }>();
  const [yearsSelect, setYearsSelect] = useState<string[]>([]);
  const monthSelected = getMonth(monthYear);
  const yearSelected = getYear(monthYear);
  const [expenditures, setExpenditures] = useState<IExpenditure[]>([]);
  const [expendituresAbstract, setExpendituresAbstract] = useState<IExpenditureAbstract[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabSelect(tabIndex: SetStateAction<number>) {
    setSelectedTab(tabIndex);
  }

  useEffect(() => {
    getExpendituresMonthYearEndpoint(yearSelected + "-" + monthSelected).then(
      (expendituresMonth) => {
        setExpenditures(expendituresMonth);
        setExpendituresAbstract(calculateCategoryExpenditures(expendituresMonth));
        setSelectedTab(0);
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
      setSelectedTab(0);
    });
  }, []);

  return (
    <>
      <ToastContainer style={{ width: "415px" }} />
      <ExpenditureHeader
        total={calculateTotal(expenditures)}
        month={monthSelected}
        year={yearSelected}
        yearsSelect={yearsSelect}
      />
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Abstract</Tab>
          <Tab>Detail</Tab>
        </TabList>

        <TabPanel>
          <ExpenditureTableAbstract expenditures={expendituresAbstract} />
        </TabPanel>
        <TabPanel>
          <ExpenditureTableDetail expenditures={expenditures} />
        </TabPanel>
      </Tabs>
    </>
  );
}

function calculateTotal(expenditures: IExpenditure[]) {
  const total = expenditures.reduce((acc, curr) => {
    return acc + curr.totalValue;
  }, 0);
  return formatNumber(total);
}

function onlyUnique(value: any, index: any, self: string | any[]) {
  return self.indexOf(value) === index;
}

function calculateCategoryExpenditures(expenditures: IExpenditure[]) {
  const expendituresAbstract: IExpenditureAbstract[] = [];
  const monthYear = expenditures[0].monthYear;
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
        monthYear
      })
  }
  return expendituresAbstract;
}
