import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectAllAlbums, selectAllPlaylists, selectAllArtists, selectAllTracks, getTracksForCertainAlbumFromSearchResults} from '../../features/searchResults/searchResults';
import {generateTrackPlayBackWidget, removeALbumPlayBackWidget, generatePlaylistPlayBackWidget, removePlaylistPlayBackWidget, removeTrackPlayBackWidget} from '../../features/playBackWidget/playBackWidget';

const DisplaySearchResults = () => {

    const dispatch = useDispatch();
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

    // display artist
    const displayArtist = () => {
        try {
            return (
                <div key = { mainArtist.id } >
                    <img src = { mainArtist.images[1].url } />
                    <h4>{mainArtist.name}</h4>
                    <p>Artist</p>
                </div>
            );
        } catch(err) {
            console.log(err);
        }
    }
    
    // check if there are any albums
    const isThereAnyAlbumResults = () => {
        if(displayAlbums.length > 0) return true;
    };

    // write "Albums" heading above albums results if there are any albums results
    const displayAlbumsHeading = () => {
        if(isThereAnyAlbumResults()) {
            return (
                <h1>Albums</h1>
            );
        }
    };

    // display albums
    const displayAlbums = albums.map( album => {
        // when the user clicks on certain album
        const onAlbumButtonClick = () => {
            dispatch(getTracksForCertainAlbumFromSearchResults(album.id));
        };
        try{
            return (
                <section key = { album.id } >
                    <img src = { album.images[1].url } />
                    <h4>
                        <button onClick={onAlbumButtonClick}>
                            <Link to = {`searchResults/album/${album.id}`} > { album.name } </Link>
                        </button>
                    </h4>
                    <h4> { album.artists[0].name } </h4>
                </section>
        );
        } catch(err) {
            console.log(err);
        }
    } );

    // check if there are any playlists
    const isThereAnyPlaylistsResults = () => {
        if(displayPlaylists.length > 0) return true;
    };

    // write "Playlists" heading above playlists results if there are any playlists results
    const displayPlaylistsHeading = () => {
        if(isThereAnyPlaylistsResults()) {
            return (
                <h1>Playlists</h1>
            );
        }
    };

    // display playlists
    const displayPlaylists = playlists.map( playlist => {
        // when the user clicks on certain playlist
        const onPlaylistButtonClick = () => {
            generatePlaylistPlayBackWidget(playlist.id);
            removeALbumPlayBackWidget();
            removeTrackPlayBackWidget();
        };
        try{
            return (
                <section key = { playlist.id } >
                    <img src = { playlist.images[0].url } />
                    <h1>{playlist.name}</h1>
                    <span>{playlist.tracks.total} Tracks</span>
                    <div>
                        <button onClick={onPlaylistButtonClick}>Play</button>
                    </div>
                </section>
        );
        } catch(err) {
            console.log(err);
        }
    } );

    // check if there are any tracks
    const isThereAnyTracksResults = () => {
        if(displayTracks.length > 0) return true;
    };

    // write "Tracks" heading above tracks results if there are any tracks results
    const displayTracksHeading = () => {
        if(isThereAnyTracksResults()) {
            return (
                <h1>Tracks</h1>
            );
        }
    };

    // display tracks
    const displayTracks = tracks.map( track => {
        // when the user clicks on certain track
        const onTrackButtonClick = () => {
            generateTrackPlayBackWidget(track.id);
            removeALbumPlayBackWidget();
            removePlaylistPlayBackWidget();
        };
        return (
                <section key = { track.id } >
                    <h4>
                        { track.name }
                    </h4>
                    <button onClick={onTrackButtonClick}>Play</button>
                </section>
        );
    } );
    
    // If there are no search results
    // display a message to the user
    const displayMessageIfThereAreNoResults = () => {
        if( mainArtist === undefined
            && displayAlbums.length === 0
            && displayTracks.length === 0
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
                        <section className="container">
                            {displayArtist()}
                        </section>
                        <section className="container">
                            {displayAlbumsHeading()}
                            {displayAlbums}
                        </section>
                        <section className="container">
                            {displayPlaylistsHeading()}
                            {displayPlaylists}
                        </section>
                        <section className="container">
                            {displayTracksHeading()}
                            {displayTracks}
                        </section>
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