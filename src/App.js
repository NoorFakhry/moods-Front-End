import './App.css';
import './UI-components/DisplaySearchResults/DisplaySearchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect
} from "react-router-dom";
import WelcomePage from './UI-components/WelcomePage/WelcomePage';
import HomePage from './UI-components/HomePage/HomePage';
import DisplaySearchResults from './UI-components/DisplaySearchResults/DisplaySearchResults';
import NavBar from './UI-components/NavBar/NavBar';
import './features/searchResults/searchResults';
import './features/webPlayer/webPlayer';

const App = () => {
  const location = useLocation();
  // hide the navbar on the welcome page
  const hideNavBarOnWelcomePage = () => {
    if(location.pathname !== '/') {
      return <NavBar/>
    }
  };
  return (
      <Router>
        <div className="App">
          {/* this function will render NavBar ecxept if the app is on WelcomePage */}
          {hideNavBarOnWelcomePage()}
          <Switch>
            <Route exact path = "/" component = { WelcomePage } ></Route>
            <Route exact path = "/homePage" component = {HomePage} ></Route>
            <Route exact path = "/searchResults" component = { DisplaySearchResults } ></Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
