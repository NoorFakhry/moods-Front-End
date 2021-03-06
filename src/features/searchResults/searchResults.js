import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getSearchResults, getTracksForCertainAlbum} from '../../spotify_api/spotify_api';

const errorMessage = {
    status: '401',
    message: 'sorry, try again!!'
};

// create state for searchInputLength
const searchInput = {
    length:0,
    value: ''
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
const artistsAdapter = createEntityAdapter({});

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
    selectAll: selectAllTracks,
    selectById: selectTrackById
} = tracksSelectors;

// create adapter for playlists results
const playlistsAdapter = createEntityAdapter({});

// create state for playlists results
const playlistsResults= playlistsAdapter.getInitialState({
    status: 'Idle',
    error: null
});

// create selectors object for the playlists
const playlistsSelectors = playlistsAdapter.getSelectors( state => state.searchResults.playlistsResults );

// create selectors for the playlists
// to be able to use them in any of the UI components
export const {
    selectAll: selectAllPlaylists,
} = playlistsSelectors;

// initial state for the searchResults slice
const searchResultsInitialState = {
    searchInput,
    artistsResults,
    albumsResults,
    tracksResults,
    playlistsResults,
};

// create state for the search results
const searchResults = createSlice({
    name: 'searchResults',
    initialState: searchResultsInitialState,
    reducers:{
        changeSearchInputValue: (state, action) => {
            state.searchInput.value = action.payload;
        },
        changeSearchInputLength: (state, action) => {
            state.searchInput.length = action.payload;
        }
    },
    extraReducers:{
        // action creators for getSearchResults function
        [getSearchResultsWhileSearching.pending]: (state) => {
            state.albumsResults.status = 'Loading';
            state.artistsResults.status = 'Loading';
            state.tracksResults.status = 'Loading';
            state.playlistsResults.status = 'Loading';
        },
        [getSearchResultsWhileSearching.fulfilled]: ( state, action ) => {
            try{
                state.albumsResults.status = 'Succeeded';
                state.artistsResults.status = 'Succeeded';
                state.tracksResults.status = 'Succeeded';
                state.playlistsResults.status = 'Succeeded';
                state.albumsResults.error = null;
                state.artistsResults.error = null;
                state.tracksResults.error = null;
                state.playlistsResults.error = null;
                albumsAdapter.setAll( state.albumsResults, action.payload.albums.items );
                artistsAdapter.setAll( state.artistsResults, action.payload.artists.items );
                tracksAdapter.setAll( state.tracksResults, action.payload.tracks.items );
                playlistsAdapter.setAll( state.playlistsResults, action.payload.playlists.items );
            } catch(err) {
                state.albumsResults.status = 'Failed';
                state.artistsResults.status = 'Failed';
                state.tracksResults.status = 'Failed';
                state.playlistsResults.status = 'Failed';
                if(action.payload.error) {
                    state.albumsResults.error = action.payload.error;
                    state.artistsResults.error = action.payload.error;
                    state.tracksResults.error = action.payload.error;
                    state.playlistsResults.error = action.payload.error;
                } else {
                    state.albumsResults.error = errorMessage;
                    state.artistsResults.error = errorMessage;
                    state.tracksResults.error = errorMessage;
                    state.playlistsResults.error = errorMessage;
                }
                albumsAdapter.setAll( state.albumsResults, {} );
                artistsAdapter.setAll( state.artistsResults, {} );
                tracksAdapter.setAll( state.tracksResults, {} );
                playlistsAdapter.setAll( state.playlistsResults, {} );
            }
        }, 
        [getSearchResultsWhileSearching.rejected]: ( state ) => {
            state.albumsResults.status = 'Failed';
            state.artistsResults.status = 'Failed';
            state.tracksResults.status = 'Failed';
            state.playlistsResults.status = 'Failed';
            state.albumsResults.error = errorMessage;
            state.artistsResults.error = errorMessage;
            state.tracksResults.error = errorMessage;
            state.playlistsResults.error = errorMessage;
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

// export action creators
export const {changeSearchInputLength, changeSearchInputValue} = searchResults.actions;

export default searchResults.reducer;