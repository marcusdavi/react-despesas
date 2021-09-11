import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ExpenditurePage from "./pages/ExpenditurePage";
import LoginPage from "./pages/LoginPage";
import { useEffect, useState } from "react";
import { IUser } from "./interfaces/Interfaces";
import { getUserEndpoint } from "./services/apiService";
import { authContext } from "./hooks/authContext";

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);

  const monthYear: string = "2021-01";

  useEffect(() => {
    getUserEndpoint().then(setUser, () => onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSignOut }}>
        <Router>
          <Switch>
            <Route path="/expenditures/:monthYear">
              <ExpenditurePage />
            </Route>
            <Redirect to={{ pathname: "/expenditures/" + monthYear }} />
          </Switch>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginPage onSignIn={setUser} />;
  }
}
