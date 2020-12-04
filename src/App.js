import './App.css';
import './UI-components/DisplaySearchResults/DisplaySearchResults.css';
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
import DisplaySearchResults from './UI-components/DisplaySearchResults/DisplaySearchResults';
import './features/searchResults/searchResults';
import './features/webPlayer/webPlayer';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path = "/" component={WelcomePage}></Route>
        <Route exact path = "/homePage" component={HomePage}></Route>
        <Route exact path = "/searchResults" component={DisplaySearchResults}></Route>
      </Router>
    </div>
  );
};

export default App;
