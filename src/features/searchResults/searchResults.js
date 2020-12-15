import { createEntityAdapter, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs';
import {accessToken} from '../../tokens/tokens';

const errorMessage = {
    status: '401',
    message: 'sorry, try again!!'
};

// create getters from spotify API
// ==============================

// create async function that returns album tracks if the user press on certain album
export const getTracksForCertainAlbum = createAsyncThunk('searchResults/getTracksForCertainAlbum', async (albumId) => {
    const albumUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50&offset=0`;
    const response = await fetch(albumUrl,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    } );
    const tracksForThisAlbum = await response.json();
    tracksForThisAlbum.id = albumId;
    console.log(tracksForThisAlbum);
    return tracksForThisAlbum;
}) 


// create async function that returns the search results for the user
export const getSearchResults = createAsyncThunk( 'searchResults/getSearchResults', async ( input ) => {
        const url = `https://api.spotify.com/v1/search?q=${input}&type=album%2Cartist%2Ctrack&limit=50&offset=0`;
        const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
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
    selectAll: selectAllAlbums,
    selectById: selectAlbumById
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
        // action creators for getSearchResults function
        [ getSearchResults.pending ]: (state) => {
            state.albumsResults.status = 'Loading';
            state.artistsResults.status = 'Loading';
            state.tracksResults.status = 'Loading';
        },
        [ getSearchResults.fulfilled ]: ( state, action ) => {
            if(action.payload.albums && action.payload.tracks && action.payload.artists) {
                state.albumsResults.status = 'Succeeded';
                state.artistsResults.status = 'Succeeded';
                state.tracksResults.status = 'Succeeded';
                state.albumsResults.error = null;
                state.artistsResults.error = null;
                state.tracksResults.error = null;
                albumsAdapter.setAll( state.albumsResults, action.payload.albums.items );
                artistsAdapter.setAll( state.artistsResults, action.payload.artists.items );
                tracksAdapter.setAll( state.tracksResults, action.payload.tracks.items );
            } else if(action.payload.error) {
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
        [ getSearchResults.rejected ]: ( state ) => {
            state.albumsResults.status = 'Failed';
            state.artistsResults.status = 'Failed';
            state.tracksResults.status = 'Failed';
            state.albumsResults.error = errorMessage;
            state.artistsResults.error = errorMessage;
            state.tracksResults.error = errorMessage;
        },
        // =============================================

        // action creators for getTracksForCertainAlbum function
        [getTracksForCertainAlbum.fulfilled]: (state, action) => {
            // get the album id from the returned data
            const albumId = action.payload.id;
            // get the tracks from the returned data
            const tracks = action.payload.items;
            // check if the state has an album with the same id
            if(state.albumsResults.entities.hasOwnProperty(albumId)) {
                state.albumsResults.entities[albumId].tracks = tracks;
                console.log('Tracks =>',state.albumsResults.entities[albumId].tracks)
            }
        }
    }
});

export default searchResults.reducer;