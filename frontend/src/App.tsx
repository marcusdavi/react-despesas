import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ExpenditurePage from "./pages/ExpenditurePage";

export default function App() {
  const monthYear:string = "2021-01";

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
