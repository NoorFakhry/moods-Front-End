import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getSearchResults, getTracksForCertainAlbum} from '../../spotify_api/spotify_api';

const errorMessage = {
    status: '401',
    message: 'sorry, try again!!'
};

// create function that returns search results for whatever the user enters in input field
export const getSearchResultsWhileSearching = createAsyncThunk('searchResults,getSearchResultsWhileSearching', (input) => {
    return getSearchResults(input);
});

// create function that returns album tracks if the user press on certain album from search results
export const getTracksForCertainAlbumFromSearchResults = createAsyncThunk('searchResults, getTracksForCertainAlbumFromSearchResults', (albumId) => {
    return getTracksForCertainAlbum(albumId);
});

// create adapter for albums results
const albumsAdapter = createEntityAdapter({
    sortComparer: ( a, b ) => b.release_date.localeCompare( a.release_date )
});

// create state for albums results
const albumsResults= albumsAdapter.getInitialState({
    status: 'Idle',
    error: null
});

// create selectors object for the albums
const albumsSelectors = albumsAdapter.getSelectors( state => state.searchResults.albumsResults );

// create selectors for the albums
// to be able to use them in any of the UI components
export const {
    selectAll: selectAllAlbums,
    selectById: selectAlbumById
} = albumsSelectors;

// create adapter for artists results
const artistsAdapter = createEntityAdapter({
    //sortComparer: ( a, b ) => b.popularity.localeCompare( a.popularity )
});

// create state for artists results
const artistsResults= artistsAdapter.getInitialState({
    status: 'Idle',
    error: null
});

// create selectors object for the artists
const artistsSelectors = artistsAdapter.getSelectors( state => state.searchResults.artistsResults );

// create selectors for the artists
// to be able to use them in any of the UI components
export const {
    selectAll: selectAllArtists
} = artistsSelectors;

// create adapter for tracks results
const tracksAdapter = createEntityAdapter({
    sortComparer: ( a, b ) => b.album.release_date.localeCompare( a.album.release_date )
});

// create state for tracks results
const tracksResults= tracksAdapter.getInitialState({
    status: 'Idle',
    error: null
});

// create selectors object for the tracks
const tracksSelectors = tracksAdapter.getSelectors( state => state.searchResults.tracksResults );

// create selectors for the tracks
// to be able to use them in any of the UI components
export const {
    selectAll: selectAllTracks
} = tracksSelectors;

// initial state for the searchResults slice
const searchResultsInitialState = {
    artistsResults,
    albumsResults,
    tracksResults
};

// create state for the search results
const searchResults = createSlice({
    name: 'searchResults',
    initialState: searchResultsInitialState,
    reducers:{},
    extraReducers:{
        // action creators for getSearchResults function
        [ getSearchResultsWhileSearching.pending ]: (state) => {
            state.albumsResults.status = 'Loading';
            state.artistsResults.status = 'Loading';
            state.tracksResults.status = 'Loading';
        },
        [ getSearchResultsWhileSearching.fulfilled ]: ( state, action ) => {
            try{
                state.albumsResults.status = 'Succeeded';
                state.artistsResults.status = 'Succeeded';
                state.tracksResults.status = 'Succeeded';
                state.albumsResults.error = null;
                state.artistsResults.error = null;
                state.tracksResults.error = null;
                albumsAdapter.setAll( state.albumsResults, action.payload.albums.items );
                artistsAdapter.setAll( state.artistsResults, action.payload.artists.items );
                tracksAdapter.setAll( state.tracksResults, action.payload.tracks.items );
            } catch(err) {
                state.albumsResults.status = 'Failed';
                state.artistsResults.status = 'Failed';
                state.tracksResults.status = 'Failed';
                state.albumsResults.error = action.payload.error;
                state.artistsResults.error = action.payload.error;
                state.tracksResults.error = action.payload.error;
                albumsAdapter.setAll( state.albumsResults, {} );
                artistsAdapter.setAll( state.artistsResults, {} );
                tracksAdapter.setAll( state.tracksResults, {} );
            }
        }, 
        [ getSearchResultsWhileSearching.rejected ]: ( state ) => {
            state.albumsResults.status = 'Failed';
            state.artistsResults.status = 'Failed';
            state.tracksResults.status = 'Failed';
            state.albumsResults.error = errorMessage;
            state.artistsResults.error = errorMessage;
            state.tracksResults.error = errorMessage;
        },
        // =============================================

        // action creators for getTracksForCertainAlbum function
        [getTracksForCertainAlbumFromSearchResults.fulfilled]: (state, action) => {
            // get the album id from the returned data
            const albumId = action.payload.id;
            // get the tracks from the returned data
            const tracks = action.payload.items;
            try{
            // check if the state has an album with the same id
            state.albumsResults.entities[albumId].tracks = tracks;
            console.log('Tracks =>',state.albumsResults.entities[albumId].tracks);
            } catch(err) {
                console.log(action.payload.error);
            }  
        }
    }
});

export default searchResults.reducer;