import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/searchResults/searchResults'; 
import '../features/recommendations/recommendations';

// create the store
const store =  configureStore({
    // create the state of the app
    reducer: {
      // create state for search results
      searchResults: searchResultsReducer
      // create state for recommendations

    }
  });

// export the store
export default store;