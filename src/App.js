import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import Dollar from "./dollar";

function App() {
  return (
          <Router>
              <Route path={"/"} exact={true} component={Home} />
              <Route path={"/dollar"} component={Dollar} />
          </Router>
  );
}

export default App;
