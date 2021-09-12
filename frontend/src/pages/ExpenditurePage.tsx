import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpenditureHeader from "../components/ExpenditureHeader";
import ExpenditureTableAbstract from "../components/ExpenditureTableAbstract";
import ExpenditureTableDetail from "../components/ExpenditureTableDetail";
import { getMonth, getYear } from "../helpers/dateHelpers";
import { useCalcExpenditure } from "../hooks/useCalcExpenditure";


export default function DespesaPage() {
  const { monthYear } = useParams<{ monthYear: string }>();
  const monthSelected = getMonth(monthYear);
  const yearSelected = getYear(monthYear);
  const { yearsSelect, expenditures, expendituresAbstract, total } =
    useCalcExpenditure(monthYear);
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabSelect(tabIndex: SetStateAction<number>) {
    setSelectedTab(tabIndex);
  }

  useEffect(() => {
    setSelectedTab(0);
  }, [yearSelected, monthSelected]);

  return (
    <>
      <ToastContainer style={{ width: "415px" }} />
      <ExpenditureHeader
        total={total}
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
