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
  const month = getMonthYearToday();

  return (
    <Router>
      <Switch>
        <Route path="/despesas/:month">
          <DespesaPage />
        </Route>
        <Redirect to={{ pathname: "/despesas/" + month }} />
      </Switch>
    </Router>
  );
}
