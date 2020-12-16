import React, {Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectAllAlbums, selectAllArtists, selectAllTracks, getTracksForCertainAlbumFromSearchResults} from '../../features/searchResults/searchResults';

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
            console.log(err);
            return <h1>not found</h1>
        }
    }
    
    
    // display albums
    const displayAlbums = albums.map( album => {
        // when the user clicks on certain album
        const onAlbumButtonClick = () => {
            dispatch(getTracksForCertainAlbumFromSearchResults(album.id));
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
    // display tracks
    const displayTracks = tracks.map( track => {
        return (
                <div key = { track.id } >
                    <h4>
                        <a href = { track.external_urls.spotify } > { track.name } </a>
                    </h4>
                </div>
        );
    } );

    // display all search results
    const displaySearchResults = () => {
        try{
            return (
                <Fragment>
                    <div className="container">
                    {displayArtist()}
                    </div>
                    <div className="container">
                        <h1>Albums</h1>
                        {displayAlbums}
                    </div>
                    <div className="container">
                        <h1>Tracks</h1>
                        {displayTracks}
                    </div>
                </Fragment>
            )
        } catch(err) {
            console.log(err);
            return(
                <h1>Can't find results</h1>
            )
        }
    }

    return (
        <Fragment>
            {displaySearchResults()}
        </Fragment>
    )
};

export default DisplaySearchResults;