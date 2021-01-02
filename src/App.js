import './App.css';
import './UI-components/NavBar/NavBar.css';
import './UI-components/DisplaySearchResults/DisplaySearchResults.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Fragment} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import WelcomePage from './UI-components/WelcomePage/WelcomePage';
import HomePage from './UI-components/HomePage/HomePage';
import DisplaySearchResults from './UI-components/DisplaySearchResults/DisplaySearchResults';
import NavBar from './UI-components/NavBar/NavBar';
import DisplaySingleAlbumFromSearchResults from './UI-components/DisplaySingleAlbumFromSearchResults/DisplaySingleAlbumFromSearchResults';
import DisplaySingleAlbumFromRecommendations from './UI-components/DisplaySingleAlbumFromRecommendations/DisplaySingleAlbumFromRecommendations';
import TrackStreamingWidget from './UI-components/StreamingWidgets/TrackStreamingWidget';
import AlbumStreamingWidget from './UI-components/StreamingWidgets/AlbumStreamingWidget';
import PlaylistStreamingWidget from './UI-components/StreamingWidgets/PlaylistStreamingWidget';
import './features/searchResults/searchResults';
import {useDispatch} from 'react-redux';
import {getNewAlbumsReleasesWhenAppStarts} from './features/recommendations/recommendations';


const App = () => {
  
  const dispatch = useDispatch();

  // get albums new releases when the app starts
  dispatch(getNewAlbumsReleasesWhenAppStarts());

  const location = useLocation();
  // hide the navbar on the welcome page
  const hideNavBarOnWelcomePage = () => {
    if(location.pathname !== '/') {
      return <NavBar/>
    }
  };
  return (
    <Fragment>
      <div className="App">
        <Router>
            {/* this function will render NavBar ecxept if the app is on WelcomePage */}
            {hideNavBarOnWelcomePage()}
            <Switch>
              <Route exact path = "/" component = { WelcomePage } ></Route>
              <Route exact path = "/homePage" component = {HomePage} ></Route>
              <Route exact path = "/searchResults" component = { DisplaySearchResults } ></Route>
              <Route exact path = "/searchResults/album/:albumId" component = {DisplaySingleAlbumFromSearchResults}></Route>
              <Route exact path = "/albumsNewReleases/album/:albumId" component = {DisplaySingleAlbumFromRecommendations}></Route>
            </Switch>
          
        </Router>
        <TrackStreamingWidget />
        <AlbumStreamingWidget />
        <PlaylistStreamingWidget />
      </div>
    </Fragment>
  );
}

export default App;
