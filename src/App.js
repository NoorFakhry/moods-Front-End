import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import WelcomePage from './features/WelcomePage';
import HomePage from './features/HomePage/HomePage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path = "/" component = {WelcomePage}></Route>
        <Route exact path = "/homePage" component = {HomePage}></Route>
      </Router>
    </div>
  );
};

export default App;
