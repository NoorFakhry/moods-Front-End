import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/searchResults/searchResults'; 
import recommendationsReducer, {getNewAlbumsReleases} from '../features/recommendations/recommendations';

// create the store
const store =  configureStore({
    // create the state of the app
    reducer: {
      // create state for search results
      searchResults: searchResultsReducer,
      // create state for recommendations
      recommendations: recommendationsReducer
    }
  });
// export the store
export default store;