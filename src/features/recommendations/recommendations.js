import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {accessToken} from '../../tokens/tokens';

const errorMessage = {
    status: '401',
    message: 'sorry, try again!!'
};

// logic for creating state for albums new releases
// ===============================================
// create async function that returns albums new releases 
export const getNewAlbumsReleases = createAsyncThunk( 'recommendations/getNewReleases', async () => {
    const url = 'https://api.spotify.com/v1/browse/new-releases?limit=50&offset=5';
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    console.log(data.albums.items)
    return data.albums.items;
} );

// create adapter for albums new releases results
const albumsNewReleasesAdapter = createEntityAdapter({
});

// create state for albums new releases results
const albumsNewReleases= albumsNewReleasesAdapter.getInitialState({
    status: 'idle',
    error: null
});

// create selectors object for the albums new releases
const albumsNewReleasesSelectors = albumsNewReleasesAdapter.getSelectors( state => state.recommendations.albumsNewReleases );

// create selectors for the albums
// to be able to use them in any of the UI components
export const {
    selectAll: selectAllAlbumsNewReleases
} = albumsNewReleasesSelectors;
// =================================================

// logic for creating state for categories recommendations
// ======================================================



// ======================================================

// create initial state for the recommendations slice
const recommendationsInitialState = {
    albumsNewReleases,
};

// create slice for the recommendations state
const recommendations = createSlice({
    name: 'recommendations',
    initialState: recommendationsInitialState,
    reducers:{},
    extraReducers: {
        // action creators for new albums releases feature
        [ getNewAlbumsReleases.pending ]: state => {
            state.albumsNewReleases.status = 'Loading';
        },
        [ getNewAlbumsReleases.fulfilled ]: ( state, action ) => {
            state.albumsNewReleases.status = 'succeeded';
            albumsNewReleasesAdapter.setAll( state.albumsNewReleases, action.payload );
        },
        [ getNewAlbumsReleases.rejected ]: ( state, action ) => {
            state.albumsNewReleases.status = 'Failed';
            state.albumsNewReleases.error = errorMessage;
        }
        // ==================================================

    }
});

export default recommendations.reducer;