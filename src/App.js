import './App.css';
import './UI-components/NavBar/NavBar.css';
import './UI-components/DisplaySearchResults/DisplaySearchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import WelcomePage from './UI-components/WelcomePage/WelcomePage';
import SearchPage from './UI-components/SearchPage/SearchPage';
import DisplaySearchResults from './UI-components/DisplaySearchResults/DisplaySearchResults';
import NavBar from './UI-components/NavBar/NavBar';
import DisplaySingleAlbumFromSearchResults from './UI-components/DisplaySingleAlbumFromSearchResults/DisplaySingleAlbumFromSearchResults';
import DisplaySingleAlbumFromRecommendations from './UI-components/DisplaySingleAlbumFromRecommendations/DisplaySingleAlbumFromRecommendations';
import './features/searchResults/searchResults';
import {useDispatch} from 'react-redux';
import {getNewAlbumsReleasesWhenAppStarts} from './features/recommendations/recommendations';
import SearchBar from './UI-components/SearchBar/SearchBar';
import Footer from './UI-components/Footer/Footer';
import DisplayAlbumsNewReleasesFromRecommendations from './UI-components/DisplayAlbumsNewReleasesFromRecommendations/DisplayAlbumsNewReleasesFromRecommendations';
import RecentReleasesHeader from './UI-components/Headers/RecentReleasesHeader/RecentReleasesHeader';
import StreamingWidget from './UI-components/StreamingWidget/StreamingWidget';

const App = () => {  

  const dispatch = useDispatch();
  
  // get albums new releases after 1 sec
  // inorder to wait for the access token to come from the server
  setTimeout(() => {
    dispatch(getNewAlbumsReleasesWhenAppStarts());
  }, 2000);

  return (
      <Router>
        <div>
            <Switch>
              <Route exact path = "/" >
                <div className="welcomePage-container">
                  <WelcomePage/>
                </div>
              </Route>
              <Route exact path = "/homePage">
                <div className="homepage-container">
                  <NavBar />
                  <RecentReleasesHeader />
                  <DisplayAlbumsNewReleasesFromRecommendations />
                  <StreamingWidget />
                  <Footer />
                </div>
              </Route>
              <Route exact path = "/search" >
                <div className="searchPage-container">
                  <NavBar/>
                  <SearchBar/>
                  <SearchPage/>
                </div>
              </Route>
              <Route exact path = "/search/:query" >
                <div className="searchResults-container">
                  <NavBar/>
                  <SearchBar/>
                  <DisplaySearchResults/>
                </div>
              </Route>
              <Route exact path = "/search/:query/album/:albumId">
                <div className="albumFromSearchResults-container">
                  <NavBar/>
                  <DisplaySingleAlbumFromSearchResults/>
                </div>
              </Route>
              <Route exact path = "/albumsNewReleases/album/:albumId">
                <div className="albumFromRecommendations-container">
                  <NavBar/>
                  <DisplaySingleAlbumFromRecommendations/>
                </div>
              </Route>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
