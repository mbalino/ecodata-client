import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import Dollar from "./dollar";
import SignUp from "./signUp";

function App() {
  return (
          <Router>
              <Route path={"/"} exact={true} component={Home} />
              <Route path={"/dollar"} component={Dollar} />
              <Route path={"/signUp"} component={SignUp} />
          </Router>
  );
}

export default App;
