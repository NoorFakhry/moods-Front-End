import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectAllAlbums, selectAllArtists, selectAllTracks, getTracksForCertainAlbumFromSearchResults} from '../../features/searchResults/searchResults';
import {generateAlbumPlayBackWidget, generateTrackPlayBackWidget} from '../../features/playBackWidget/playBackWidget';

const DisplaySearchResults = () => {
    const dispatch = useDispatch();
    // select all albums
    const albums = useSelector( selectAllAlbums );
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
                    <h4>
                        <a href = { mainArtist.external_urls.spotify } > { mainArtist.name } </a>
                    </h4>
                    <p>Artist</p>
                </div>
            );
        } catch(err) {
            //console.log(err);
        }
    }
    
    // display albums
    const displayAlbums = albums.map( album => {
        // when the user clicks on certain album
        const onAlbumButtonClick = () => {
            dispatch(getTracksForCertainAlbumFromSearchResults(album.id));
            generateAlbumPlayBackWidget(album.id);
        };
        return (
                <div key = { album.id } >
                    <img src = { album.images[1].url } />
                    <h4>
                        <button onClick={onAlbumButtonClick}>
                            <Link to = {`searchResults/album/${album.id}`} > { album.name } </Link>
                        </button>
                    </h4>
                    <h4> { album.artists[0].name } </h4>
                </div>
        );
    } );
    
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

    // display tracks
    const displayTracks = tracks.map( track => {
        // when the user clicks on certain track
        const onTrackButtonClick = () => {
            generateTrackPlayBackWidget(track.id);
        };
        return (
                <div key = { track.id } >
                    <h4>
                    <button onClick={onTrackButtonClick}>
                            <Link to = {`searchResults/track/${track.id}`} > { track.name } </Link>
                    </button>
                    </h4>
                </div>
        );
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
                        <div className="container">
                            {displayArtist()}
                        </div>
                        <div className="container">
                            {displayAlbumsHeading()}
                            {displayAlbums}
                        </div>
                        <div className="container">
                            {displayTracksHeading()}
                            {displayTracks}
                        </div>
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