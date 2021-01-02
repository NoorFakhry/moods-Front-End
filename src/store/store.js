import { configureStore} from '@reduxjs/toolkit';
import searchResultsReducer from '../features/searchResults/searchResults'; 
import recommendationsReducer from '../features/recommendations/recommendations';

// create the store
const store =  configureStore({
    // create the state of the app
    reducer: {
      // create state for search results
      searchResults: searchResultsReducer,
      // create state for recommendations
      recommendations: recommendationsReducer
    },
    // middlewares
    // middleware: getDefaultMiddleware => 
    //   getDefaultMiddleware({
    //     immutableCheck: false,
    //     serializableCheck: false,
    //   }),
  });
// export the store
export default store;