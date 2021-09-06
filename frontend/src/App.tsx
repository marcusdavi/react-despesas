import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import DespesaPage from "./pages/DespesaPage";
import { getMonthYearToday } from "./helpers/dateHelpers";

export default function App() {
  const monthYear = getMonthYearToday();

  return (
    <Router>
      <Switch>
        <Route path="/despesas/:monthYear">
          <DespesaPage />
        </Route>
        <Redirect to={{ pathname: "/despesas/" + monthYear }} />
      </Switch>
    </Router>
  );
}
