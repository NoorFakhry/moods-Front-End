import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {selectAllAlbums, selectAllPlaylists, selectAllArtists, selectAllTracks} from '../../features/searchResults/searchResults';
import DisplayAlbumsFromSearchResults from '../DisplayAlbumsFromSearchResults/DisplayAlbumsFromSearchResults';
import DisplayPlaylistsFromSearchResults from '../DisplayPlaylistsFromSearchResults/DisplayPlaylistsFromSearchResults';
import DisplayArtistFromSearchResults from '../DisplayArtistFromSearchResults/DisplayArtistFromSearchResults';
import DisplayTracksFromSearchResults from '../DisplayTracksFromSearchResults/DisplayTracksFromSearchResults';


const DisplaySearchResults = () => {

    // select all albums
    const albums = useSelector( selectAllAlbums );
    // select all playlists
    const playlists = useSelector( selectAllPlaylists );
    // select all artists
    const artists = useSelector( selectAllArtists );
    // get the main artist
    const mainArtist = artists[0];
    // select all tracks
    const tracks = useSelector( selectAllTracks );
    
    // select status for
    // albums, tracks and artist results
    const albumsStatus = useSelector(state => state.searchResults.albumsResults.status);
    const tracksStatus = useSelector(state => state.searchResults.tracksResults.status);
    const artistStatus = useSelector(state => state.searchResults.artistsResults.status);
    // select search input length and value from the state
    const searchInputLength = useSelector(state => state.searchResults.searchInput.length);
    const searchInputValue = useSelector(state => state.searchResults.searchInput.value);
    
    // If there are no search results
    // display a message to the user
    const displayMessageIfThereAreNoResults = () => {
        if( mainArtist === undefined
            && albums.length === 0
            && tracks.length === 0
            && playlists.length === 0
            && searchInputLength > 0
            && albumsStatus === 'Succeeded'
            && tracksStatus === 'Succeeded'
            && artistStatus === 'Succeeded') {
                return(
                    <h1>No Search Results for {searchInputValue}</h1>
                )
            }
    };

    // display all search results
    const displaySearchResults = () => {
            while(searchInputLength > 0) {
                return (
                    <Fragment>
                        <DisplayArtistFromSearchResults/>
                        <DisplayAlbumsFromSearchResults/>
                        <DisplayPlaylistsFromSearchResults/>
                        <DisplayTracksFromSearchResults/>
                        {displayMessageIfThereAreNoResults()}
                    </Fragment>
                );
            };
    }

    return (
        <Fragment>
            {displaySearchResults()}
        </Fragment>
    )
};

export default DisplaySearchResults;