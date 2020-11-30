import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/searchResults'; 

// create the store
const store =  configureStore({
    // create the state of the app
    reducer: {
      // create state for search results
      searchResults: searchResultsReducer
    }
  });

// export the store
export default store;