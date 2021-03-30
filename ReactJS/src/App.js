import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Picker } from "./pages";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/picker">
          <Picker />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
