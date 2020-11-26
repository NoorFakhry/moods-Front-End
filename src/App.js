import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import WelcomePage from './features/WelcomePage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path = '/' component = {WelcomePage}></Route>
      </Router>
    </div>
  );
};

export default App;
