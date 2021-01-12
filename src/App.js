import './App.css';
import './UI-components/NavBar/NavBar.css';
import './UI-components/DisplaySearchResults/DisplaySearchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Fragment} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import WelcomePage from './UI-components/WelcomePage/WelcomePage';
import HomePage from './UI-components/HomePage/HomePage';
import SearchPage from './UI-components/SearchPage/SearchPage';
import DisplaySearchResults from './UI-components/DisplaySearchResults/DisplaySearchResults';
import NavBar from './UI-components/NavBar/NavBar';
import DisplaySingleAlbumFromSearchResults from './UI-components/DisplaySingleAlbumFromSearchResults/DisplaySingleAlbumFromSearchResults';
import DisplaySingleAlbumFromRecommendations from './UI-components/DisplaySingleAlbumFromRecommendations/DisplaySingleAlbumFromRecommendations';
import './features/searchResults/searchResults';
import {useDispatch} from 'react-redux';
import {getNewAlbumsReleasesWhenAppStarts} from './features/recommendations/recommendations';
import SearchBar from './UI-components/SearchBar/SearchBar';


const App = () => {
  
  const dispatch = useDispatch();

  // get albums new releases when the app starts
  dispatch(getNewAlbumsReleasesWhenAppStarts());

  return (
    <Fragment>
      <div className="App">
        <Router>
            <Switch>
              <Route exact path = "/" >
                <WelcomePage/>
              </Route>
              <Route exact path = "/homePage">
                <NavBar/>
                <HomePage/>
              </Route>
              <Route exact path = "/search" >
                <NavBar/>
                <SearchBar/>
                <SearchPage/>
              </Route>
              <Route exact path = "/search/:query" >
                <NavBar/>
                <SearchBar/>
                <DisplaySearchResults/>
              </Route>
              <Route exact path = "/search/:query/album/:albumId">
                <NavBar/>
                <DisplaySingleAlbumFromSearchResults/>
              </Route>
              <Route exact path = "/albumsNewReleases/album/:albumId">
                <NavBar/>
                <DisplaySingleAlbumFromRecommendations/>
              </Route>
            </Switch>
        </Router>
      </div>
    </Fragment>
  );
}

export default App;
