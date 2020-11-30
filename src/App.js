import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import WelcomePage from './UI-components/WelcomePage/WelcomePage';
import HomePage from './UI-components/HomePage/HomePage';
import './features/searchResults';
import './tokens/tokens'

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
