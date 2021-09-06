import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ExpenditurePage from "./pages/ExpenditurePage";
import { getMonthYearToday } from "./helpers/dateHelpers";

export default function App() {
  const monthYear = getMonthYearToday();

  return (
    <Router>
      <Switch>
        <Route path="/expenditures/:monthYear">
          <ExpenditurePage />
        </Route>
        <Redirect to={{ pathname: "/expenditures/" + monthYear }} />
      </Switch>
    </Router>
  );
}
