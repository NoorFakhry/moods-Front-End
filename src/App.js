import './App.css';
import './UI-components/DisplaySearchResults/DisplaySearchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Fragment} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import WelcomePage from './UI-components/WelcomePage/WelcomePage';
import HomePage from './UI-components/HomePage/HomePage';
import DisplaySearchResults from './UI-components/DisplaySearchResults/DisplaySearchResults';
import NavBar from './UI-components/NavBar/NavBar';
import './features/searchResults/searchResults';
import './features/webPlayer/webPlayer';

function App( props ) {
  return (
    <Fragment>
      <Router>
        <div className="App">
          {props.location.pathname === "/welcomePage" ? "" : <NavBar/> }
          <Switch>
            <Route exact path = "/welcomePage" component = { WelcomePage } ></Route>
            <Route exact path = "/" component = {HomePage} ></Route>
            <Route exact path = "/searchResults" component = { DisplaySearchResults } ></Route>
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default withRouter( App );
