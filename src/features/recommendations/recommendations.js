import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import {getNewAlbumsReleases, getTracksForCertainAlbum} from '../../spotify_api/spotify_api';

const errorMessage = {
    status: '401',
    message: 'sorry, try again!!'
};

// create function that returns album tracks if the user press on certain album from recommendations
export const getTracksForCertainAlbumFromAlbumsNewReleases = createAsyncThunk('recommendations, getTracksForCertainAlbumFromAlbumsNewReleases', (albumId) => {
    return getTracksForCertainAlbum(albumId);
});

// create function that gets albums new releases from spotify when the app starts
export const getNewAlbumsReleasesWhenAppStarts = createAsyncThunk('recommendations,getNewAlbumsReleasesWhenAppStarts', () => {
    return getNewAlbumsReleases();
});

// logic for creating state for albums new releases
// ===============================================

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

// create selectors for the albums new releases
// to be able to use them in any of the UI components
export const {
    selectAll: selectAllAlbumsNewReleases,
    selectById: selectAlbumByIdFromRecommendations
} = albumsNewReleasesSelectors;
// =================================================

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
        // action creators for getting new albums releases
        [ getNewAlbumsReleasesWhenAppStarts.pending ]: state => {
            state.albumsNewReleases.status = 'Loading';
        },
        [ getNewAlbumsReleasesWhenAppStarts.fulfilled ]: ( state, action ) => {
            state.albumsNewReleases.status = 'succeeded';
            albumsNewReleasesAdapter.setAll( state.albumsNewReleases, action.payload );
        },
        [ getNewAlbumsReleasesWhenAppStarts.rejected ]: ( state, action ) => {
            state.albumsNewReleases.status = 'Failed';
            state.albumsNewReleases.error = errorMessage;
        },
        // ==================================================

        // action creators for getTracksForCertainAlbum function
        [getTracksForCertainAlbumFromAlbumsNewReleases.fulfilled]: (state, action) => {
        // get the album id from the returned data
        const albumId = action.payload.id;
        // get the tracks from the returned data
        const tracks = action.payload.items;
        try{
            // check if the state has an album with the same id
            state.albumsNewReleases.entities[albumId].tracks = tracks;
            console.log('Tracks =>',state.albumsNewReleases.entities[albumId].tracks);
        } catch(err) {
            console.log(err);
            console.log(action.payload.error);
        }
    }
    }
});

export default recommendations.reducer;