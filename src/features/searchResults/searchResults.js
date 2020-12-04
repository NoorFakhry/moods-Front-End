import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as SpotifyApi from 'spotify-web-api-js';
import {accessToken, /*refreshToken*/} from '../../tokens/tokens'
const spotify = new SpotifyApi();

spotify.setAccessToken(accessToken);
const errorMessage = {
    status: '401',
    message: 'sorry, try again!!'
};

// create async function that returns the search results for the user
export const getSearchResults = createAsyncThunk( 'searchResults/getSearchResults', async ( input ) => {
    const data = await spotify.search( input, [ "artist", "album", "track" ] );
    return data; 
} );

// create adapter for albums results
const albumsAdapter = createEntityAdapter({
    sortComparer: ( a, b ) => b.release_date.localeCompare( a.release_date )
});

// create state for albums results
const albumsResults= albumsAdapter.getInitialState({
    status: 'idle',
    error: null
});

// create selectors object for the albums
const albumsSelectors = albumsAdapter.getSelectors( state => state.searchResults.albumsResults );

// create selectors for the albums
// to be able to use them in any of the UI components
export const {
    selectAll: selectAllAlbums
} = albumsSelectors;

// create adapter for artists results
const artistsAdapter = createEntityAdapter({
    //sortComparer: ( a, b ) => b.popularity.localeCompare( a.popularity )
});

// create state for artists results
const artistsResults= artistsAdapter.getInitialState({
    status: 'idle',
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
    status: 'idle',
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
        [ getSearchResults.pending ]: state => {
            state.albumsResults.status = 'Loading';
            state.artistsResults.status = 'Loading';
            state.tracksResults.status = 'Loading'; 
        },
        [ getSearchResults.fulfilled ]: ( state, action ) => {
            state.albumsResults.status = 'succeeded';
            state.artistsResults.status = 'succeeded';
            state.tracksResults.status = 'succeeded';
            albumsAdapter.setAll( state.albumsResults, action.payload.albums.items );
            artistsAdapter.setAll( state.artistsResults, action.payload.artists.items );
            tracksAdapter.setAll( state.tracksResults, action.payload.tracks.items );
        },
        [ getSearchResults.rejected ]: ( state, action ) => {
            state.albumsResults.status = 'Failed';
            state.artistsResults.status = 'Failed';
            state.tracksResults.status = 'Failed';
            state.albumsResults.error = errorMessage;
            state.artistsResults.error = errorMessage;
            state.tracksResults.error = errorMessage;
        }
    }
});

export default searchResults.reducer;